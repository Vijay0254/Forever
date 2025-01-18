import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import binIcon from '../assets/bin_icon.png'
import CartTotal from '../Components/CartTotal'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setcartData] = useState([])
  const navigate = useNavigate()

  function handleCartData(){
    const tempData = []
    for(let i in cartItems){
      for(let j in cartItems[i]){
        if(cartItems[i][j] > 0){
          tempData.push({
            _id: i,
            size: j,
            quantity: cartItems[i][j]
          })
        }
      }
    }
    setcartData(tempData)
  }

  useEffect(() =>{
    handleCartData()
  }, [cartItems])

  return (
    <section className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div className=''>
        {
          cartData.map((element, index) =>{
            const productData = products.find((product) =>product._id === element._id)
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} alt="productImage" className="w-16 sm:w-20" />
                  <div>
                    <p className='text-xs font-medium sm:text-lg'>{productData.name}</p>
                    <div className="items-center flex gap-5 mt-2">
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{element.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(event) =>updateQuantity(element._id, element.size, Number(event.target.value))} type="number" min={1} value={element.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
                <img onClick={() =>updateQuantity(element._id, element.size, 0)} src={binIcon} alt="binIcon" className="w-4 sm:w-5 cursor-pointer " />
              </div>
            )
          })
        }
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() =>navigate('/placeorder')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart