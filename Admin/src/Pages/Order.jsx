import { useNavigate } from 'react-router-dom'
import axios from '../utils/Axios'
import React, { useContext, useEffect, useState } from 'react'
import parcelIcon from '../assets/parcel_icon.svg'
import { userContext } from '../Context/UserContext'
import { toast } from 'react-toastify'

const Order = () => {

  const navigate = useNavigate()
  const [orders, setorders] = useState([])
  const { currency } = useContext(userContext)

  async function getOrders(){
    try{
      const response = await axios.get(`/api/order/get/all`, {withCredentials: true})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        setorders(response.data.orders.reverse())
      }
    }
    catch(err){
      console.log(`Error in Get Orders - ${err}`)
    }
  }

  async function handleUpdateStatus(orderId, status){
    try{
      const response = await axios.post(`/api/order/update/status`, {orderId: orderId, status: status},{withCredentials: true})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        toast.success('Status Updated!!!', {
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
    catch(err){
      console.log(`Error in Handle Update Status - ${err}`)
    }
  }

  useEffect(() =>{
    getOrders()
  }, [orders])

  return (
    <section>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((element) =>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={element._id}>
              <img src={parcelIcon} alt="parcelIcon" />
              <div>
                <div>
                  {element.items.map((item, index) =>{
                    if(index == element.items.length-1){
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size} </span></p>
                    }
                    else{
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size} </span>,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>{element.address.firstName + " " + element.address.lastName}</p>
                <div>
                  <p>{element.address.street + ","}</p>
                  <p>{element.address.city + ", " + element.address.state + ", " + element.address.country + ", " + element.address.zipcode}</p>
                </div>
                <p>{element.address.phone}</p>
              </div>

              <div>
                <p className='text-sm sm:text-[15px]'>Items: {element.items.length}</p>
                <p className='mt-3'>Method: {element.paymentMethod}</p>
                <p>Payment: {element.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(element.date).toDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency} {element.amount}</p>
              <select onChange={(event) =>handleUpdateStatus(element._id, event.target.value)} value={element.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Order