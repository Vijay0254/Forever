const UserModel = require("../Models/UserModel")

const getCartController = async(req, res) =>{
    try{
        const userId = req?.user?._id
        const user = await UserModel.findById({_id: userId})
        return res.status(200).json({success: true, cartData: user.cartData})
    }
    catch(err){
        console.log(`Error in Get Cart Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const addToCartController = async(req, res) =>{
    try{
        const { itemId, size } = req.body
        const userId = req?.user?._id

        const user = await UserModel.findById({_id: userId})

        let cartData = await user.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await UserModel.findByIdAndUpdate(userId, {
            cartData: cartData
        }, {new: true})
        return res.status(200).json({message: 'Added to Cart', success: true})
    }
    catch(err){
        console.log(`Error in Add To Cart Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const updateCartController = async(req, res) =>{
    try{
        const { itemId, size, quantity } = req.body
        const userId = req?.user?._id

        const user = await UserModel.findById({_id: userId})

        let cartData = await user.cartData

        cartData[itemId][size] = quantity

        await UserModel.findByIdAndUpdate(userId, {
            cartData: cartData
        }, {new: true})
        return res.status(200).json({message: 'Cart Updated', success: true})

    }
    catch(err){
        console.log(`Error in Update Cart Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

module.exports = { getCartController, addToCartController, updateCartController }