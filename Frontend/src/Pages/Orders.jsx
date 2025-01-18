import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { useEffect } from 'react'
import axios from '../Utils/Axios'
import { useState } from 'react'

const Orders = () => {

  const { currency, verifyToken, user } = useContext(ShopContext)
  const [orders, setorders] = useState([])
  useEffect(() =>{
    verifyToken()
  }, [])

  async function getOrders(){
    try{
      const response = await axios.get(`/api/order/get/user/${user._id}`, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        let allOrdersItem = []
        response.data.orders.map((element) =>{
          element.items.map((item) =>{
            item['status'] = element.status
            item['payment'] = element.payment
            item['paymentMethod'] = element.paymentMethod
            item['date'] = element.date
            allOrdersItem.push(item)
          })
        })
        setorders(allOrdersItem.reverse())
      }
    }
    catch(err){
      console.log(`Error in Get Orders - ${err}`)
    }
  }

  useEffect(() =>{
    getOrders()
  }, [])

  return (
    <section className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orders.map((element, index) =>(
            <div key={index} className='py-4 border-t border-b text-gra-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className="flex items-start text-sm gap-6">
                <img src={element.image[0]} className='w-16 sm:w-20' alt="productImg" />
                <div>
                  <p className='sm:text-base font-medium'>{element.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className='text-lg'>{currency} {element.price}</p>
                    <p>Quantity: {element.quantity}</p>
                    <p>Size: {element.size}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(element.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'>{element.paymentMethod}</span></p>
                </div>
              </div>

              <div className='flex justify-between md:w-1/2'>
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{element.status}</p>
                </div>
                <button onClick={getOrders} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Orders