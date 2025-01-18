import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import axios from '../Utils/Axios'
import { toast } from 'react-toastify'

const VerifyStripe = () => {

    const navigate = useNavigate()
    const { user, setcartItems } = useContext(ShopContext)
    const [searchParams, setsearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')


    async function verifyStripe(){
        try{
            const response = await axios.post(`/api/order/verify/stripe`, {orderId: orderId, success: success}, {withCredentials: true, headers: 'https://forever-frontend-sandy.vercel.app'})
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(response.data.success){
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
            if(!response.data.success){
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
        catch(err){
            console.log(`Error in verify Stripe - ${err}`)
        }
    }

    useEffect(() =>{
        verifyStripe()
    }, [user])

  return (
    <></>
  )
}

export default VerifyStripe