import { useNavigate } from 'react-router-dom'
import axios from '../utils/Axios'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Context/UserContext'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const List = () => {

  const [list, setlist] = useState([])
  const navigate = useNavigate()
  const { currency } = useContext(userContext)
  const [activate, setactivate] = useState(false)

  async function fetchProducts(){
    try{
      const response = await axios.get(`/api/product/get/all`, {withCredentials: true})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        setlist(response.data.products)
      }
    }
    catch(err){
      console.log(`Error in Fetch Products - ${err}`)
    }
  }

  async function handleDelete(id){
    try{
      const response = await axios.delete(`/api/product/remove/${id}`, {withCredentials: true})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        setactivate(!activate)
        toast.success('Product Deleted Successfully!!!', {
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
      console.log(`Error in Handle Delete - ${err}`)
    }
  }

  useEffect(() =>{
    fetchProducts()
  }, [activate])

  return (
    <section>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {
          list.map((element) =>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={element._id}>
              <img className='w-12' src={element.image[0]} alt="productImage" />
              <p>{element.name}</p>
              <p>{element.category}</p>
              <p>{currency} {element.price}</p>
              <p onClick={() =>handleDelete(element._id)} className='flex justify-end md:justify-center cursor-pointer text-lg'><MdDelete /></p>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default List