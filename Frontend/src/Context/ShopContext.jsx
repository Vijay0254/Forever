import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../Utils/Axios'
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  
  const currency = "$"
  const delivery_fee = 10
  const [products, setproducts] = useState([])
  const [search, setsearch] = useState("")
  const [showSearch, setshowSearch] = useState(false)
  const [cartItems, setcartItems] = useState({})
  const [user, setuser] = useState(null)
  const navigate = useNavigate()

  async function fetchProducts(){
    try{
      const response = await axios.get(`/api/product/get/all`, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        setproducts(response.data.products)
      }
    }
    catch(err){
      console.log(`Error in Fetch Products - ${err}`)
    }
  }

  async function getUserCart(){
    try{
      const response = await axios.get(`/api/cart/get`, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        setcartItems(response.data.cartData)
      }
    }
    catch(err){
      consol.log(`Error in Add to Cart - ${err}`)
    }
  }

  useEffect(() =>{
    fetchProducts()
    getUserCart()
  }, [])

  async function verifyToken(){
    try{
      const response = await axios.get(`/api/auth/user/verify`, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        setuser(response.data.user)
      }
      if(!response.data.success){
        navigate('/')
      }
    }
    catch(err){
      console.log(`Error in Verify Token - ${err}`)
    }
  }

  async function verifyToken2(){
    try{
      const response = await axios.get(`/api/auth/user/verify`, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.success){
        setuser(response.data.user)
        navigate('/')
      }
    }
    catch(err){
      console.log(`Error in Verify Token 2 - ${err}`)
    }
  }


  async function addToCart(itemId, size){
    try{
      let cartData = structuredClone(cartItems)

      if(!size){
        return toast.warn('Select Product Size!!!', {
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
      setcartItems(cartData)

      if(user){
        try{
          const response = await axios.post(`/api/cart/add`, {itemId: itemId, size: size}, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
          if(response.data.message == "Internal Server Error"){
            navigate('/500')
          }
          if(response.data.message == "Added to Cart" && response.data.success){
            toast.success('Added to Cart!!!', {
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
          console.log(`Error in Add to Cart - ${err}`)
        }
      }      
    }
    catch(err){
      console.log(`Error in Add to Cart - ${err}`)
    }
  }

  function getCartCount(){
    let totalCount = 0
    for(let i in cartItems){
      for(let j in cartItems[i]){
        try{
          if(cartItems[i][j] > 0){
            totalCount += cartItems[i][j]
          }
        } 
        catch(err){
          console.log(`Error in Get Cart Count - ${err}`)
        }
      }
    }
    return totalCount
  }

  async function updateQuantity(itemId, size, quantity){
    try{
      let cartData = structuredClone(cartItems)

      cartData[itemId][size] = quantity
      setcartItems(cartData)

      if(user){
        try{
          const response = await axios.post(`/api/cart/update`, {itemId: itemId, size: size, quantity: quantity}, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
          if(response.data.message == "Internal Server Error"){
            navigate('/500')
          }
          if(response.data.message == "Cart Updated" && response.data.success){
            toast.success('Cart Updated!!!', {
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
          consol.log(`Error in Update Quantity - ${err}`)
        }
      }  
    }
    catch (err){
      console.log(`Error in Update Quantity - ${err}`)
    }
  }

  function getCartAmount(){
    let totalAmount = 0
    for(let i in cartItems){
      let itemInfo = products.find((element) =>element._id === i)
      for(let j in cartItems[i]){
        try{
          if(cartItems[i][j] > 0){
            totalAmount += itemInfo.price * cartItems[i][j]
          }
        } 
        catch(err){
            console.log(`Error in Get Cart Amount - ${err}`)
        }
      }
    }
    return totalAmount
  }

  const value = { products, currency, delivery_fee, search, setsearch, showSearch, setshowSearch, addToCart, cartItems, setcartItems, getCartCount, updateQuantity, getCartAmount, verifyToken, verifyToken2, user, setuser }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider