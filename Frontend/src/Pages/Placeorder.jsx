import React, { useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import stripeLogo from '../assets/stripe_logo.png'
import razorpayLogo from '../assets/razorpay_logo.png'
import { useNavigate } from 'react-router-dom'
import axios from '../Utils/Axios'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify'

const Placeorder = () => {

  const { cartItems, products, getCartAmount, delivery_fee, setcartItems } = useContext(ShopContext)
  const [method, setmethod] = useState('cod')
  const navigate = useNavigate()
  const [details, setdetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  function handleDetails(event){
    const name = event.target.name
    const value = event.target.value

    setdetails((prev) =>({...prev, [name]: value}))
  }

  function initPay(order){
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response) =>{
        const validateResponse = await axios.post("/api/order/verify/razorpay", response, {withCredentials: true})
        if(validateResponse.data.message == "Internal Server Error"){
           navigate('/500')
        }
        if(validateResponse.data.success){
          setcartItems({})
          navigate('/orders')
          toast.success('Order Placed!!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        if(!validateResponse.data.success){
          navigate('/')
          toast.warn('Payment Failed!!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  async function handlePlaceOrder(event){
    event.preventDefault()
    try{

      let orderItems = []

      for(let i in cartItems){
        for(let j in cartItems[i]){
          if(cartItems[i][j] > 0){
            const itemInfo = structuredClone(products.find((element) =>element._id == i))
            if(itemInfo){
              itemInfo.size = j;
              itemInfo.quantity = cartItems[i][j]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      if(method === 'cod'){
        const response = await axios.post(`/api/order/place/cod`, {items: orderItems, amount: Number(getCartAmount() + delivery_fee), address: details}, {withCredentials: true})
        if(response.data.message == "Internal Server Error"){
          navigate('/500')
        }
        if(response.data.success){
          toast.success('Order Placed!!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          setcartItems({})
          setdetails({
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            country: "",
            phone: ""
          })
        }
      }
      if(method === 'stripe'){
        const response = await axios.post(`/api/order/place/stripe`, {items: orderItems, amount: Number(getCartAmount() + delivery_fee), address: details}, {withCredentials: true})
        if(response.data.message == "Internal Server Error"){
          navigate('/500')
        }
        if(response.data.success){
          const session_url = response.data.session_url
          window.location.replace(session_url)

          setdetails({
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            country: "",
            phone: ""
          })
        }
      }
      if(method === 'razorpay'){
        const response = await axios.post(`/api/order/place/razorpay`, {items: orderItems, amount: Number(getCartAmount() + delivery_fee), address: details}, {withCredentials: true})
        if(response.data.message == "Internal Server Error"){
          navigate('/500')
        }
        if(!response.data.success){
          toast.warn('Error in Placing Order!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
        if(response.data.success){
          initPay(response.data.orders)

          setdetails({
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            country: "",
            phone: ""
          })
        }
      }
    }
    catch(err){
      console.log(`Error in Handle Place Order - ${err}`)
    }
  }

  return (
    <form onSubmit={() =>handlePlaceOrder(event)} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required value={details.firstName} name='firstName' onChange={() =>handleDetails(event)} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required value={details.lastName} name='lastName' onChange={() =>handleDetails(event)} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required value={details.email} name='email' onChange={() =>handleDetails(event)} type="email" placeholder='Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required value={details.street} name='street' onChange={() =>handleDetails(event)} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className="flex gap-3">
          <input required value={details.city} name='city' onChange={() =>handleDetails(event)} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required value={details.state} name='state' onChange={() =>handleDetails(event)} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className="flex gap-3">
          <input required value={details.zipcode} name='zipcode' onChange={() =>handleDetails(event)} type="number" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required value={details.country} name='country' onChange={() =>handleDetails(event)} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required value={details.phone} name='phone' onChange={() =>handleDetails(event)} type="number" placeholder='Phone no' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() =>setmethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img src={stripeLogo} alt="stripeLogo" className='h-4 mx-4' />
            </div>
            <div onClick={() =>setmethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img src={razorpayLogo} alt="razorpayLogo" className='h-4 mx-4' />
            </div>
            <div onClick={() =>setmethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder