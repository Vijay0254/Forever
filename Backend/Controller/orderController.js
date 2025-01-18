const OrderModel = require("../Models/OrderModel")
const UserModel = require("../Models/UserModel")
const Stripe = require('stripe')
const Razorpay = require('razorpay')

const currency = 'inr'
const deliveryCharges = 10

//Stripe Gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//Razorpay Gateway
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


const placeCodOrderController = async(req, res) =>{
    try{
        const { items, amount, address } = req.body
        const userId = req.user._id

        const newOrder = OrderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentMethod: "COD",
            date: Date.now()
        })
        await newOrder.save()
        
        await UserModel.findByIdAndUpdate(userId, {
            cartData: {}
        }, {new: true})
        return res.status(200).json({success: true, message: "Order Placed"})
    }
    catch(err){
        console.log(`Error in Place COD Order Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const placeStripeOrderController = async(req, res) =>{
    try{
        const { items, amount, address } = req.body
        const userId = req.user._id
        const { origin } = req.headers

        const newOrder = OrderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentMethod: "Stripe",
            date: Date.now()
        })
        await newOrder.save()

        const line_items = items.map((element) =>({
            price_data: {
                currency: currency,
                product_data: {
                    name: element.name,
                },
                unit_amount: element.price * 100
            },
            quantity: element.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        return res.status(200).json({success: true, session_url: session.url})
    }
    catch(err){
        console.log(`Error in Place Stripe Order Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const verifyStripeController = async(req, res) =>{
    try{
        const { orderId, success } = req.body
        const userId = req.user._id 

        if(success == 'true'){
            //Updating Payment Condition
            await OrderModel.findByIdAndUpdate(orderId, {
                payment: true
            }, {new: true})

            //Clearing Cart Data
            await UserModel.findByIdAndUpdate(userId, {
                cartData: {}
            })
            return res.status(200).json({success: true})
        }
        else{
            //In case of failure, we are deleting order
            await OrderModel.findByIdAndDelete(orderId)
            return res.status(200).json({success: false})
        }
    }
    catch(err){
        console.log(`Error in Verify Stripe Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const placeRazorpayOrderController = async(req, res) =>{
    try{
        const { items, amount, address } = req.body
        const userId = req.user._id

        const newOrder = OrderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentMethod: "Razorpay",
            date: Date.now()
        })
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpay.orders.create(options, (err, orders) =>{
            if(err){
                console.log(`Error in Razor Pay - ${err}`)
                return res.status(200).json({success: false, message: "Payment Failed"})
            }
            return res.status(200).json({success: true, orders: orders})
        })
    }
    catch(err){
        console.log(`Error in Place Razorpay Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const verifyRazorpayController = async(req, res) =>{
    try{
        const { razorpay_order_id } = req.body
        const userId = req.user._id
        console.log("razorpay_order_id: ", razorpay_order_id)
        const orderInfo = await razorpay.orders.fetch(razorpay_order_id)
        console.log(orderInfo.status)
        if(orderInfo.status == 'paid'){
            //Updating Payment Condition
            await OrderModel.findByIdAndUpdate(orderInfo.receipt, {
                payment: true
            }, {new: true})
            
            //Clearing Cart Data
            await UserModel.findByIdAndUpdate(userId, {
                cartData: {}
            }, {new: true})
            return res.status(200).json({success: true})
        }
        else{
            //In case of failure, we are deleting order
            await OrderModel.findByIdAndDelete(orderInfo.receipt)
            return res.status(200).json({success: false, razorpay_order_id, orderInfo})
        }
    }
    catch(err){
        console.log(`Error in Verify Razorpay Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const getAllOrdersController = async(req, res) =>{
    try{
        const orders = await OrderModel.find()
        return res.status(200).json({success: true, orders: orders})
    }
    catch(err){
        console.log(`Error in Get All Orders Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const userOrdersController = async(req, res) =>{
    try{
        const { id } = req.params
        const orders = await OrderModel.find({userId: id})
        return res.status(200).json({success: true, orders: orders})
    }
    catch(err){
        console.log(`Error in User Orders Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const updateOrderStatusController = async(req, res) =>{
    try{
        const { orderId, status } = req.body
        await OrderModel.findByIdAndUpdate(orderId, {
            status: status
        }, {new: true})
        return res.status(200).json({success: true, message: "Status Updated"})
    }
    catch(err){
        console.log(`Error in Update Order Status Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

module.exports = { placeCodOrderController, placeStripeOrderController, placeRazorpayOrderController, getAllOrdersController, userOrdersController, updateOrderStatusController, verifyStripeController, verifyRazorpayController }