import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const CartTotal = () => {

    const { getCartAmount, currency, delivery_fee } = useContext(ShopContext)

  return (
    <section className='w-full'>
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTAL'} />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <b>Total</b>
                <b>{currency} {getCartAmount() + delivery_fee}.00</b>
            </div>
        </div>
    </section>
  )
}

export default CartTotal