import axios from '../utils/Axios'
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { userContext } from '../Context/UserContext';

const Login = () => {

    const { verifyToken } = useContext(userContext)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [active, setactive] = useState(false)
    const navigate = useNavigate()

    async function handleLogin(event){
        event.preventDefault()
        try{
            const response = await axios.post(`/api/auth/admin/login`, {email: email, password: password}, {withCredentials: true})
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                setactive(!active)
                toast.warn(`${response.data.message}!`, {
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
                toast.success(`${response.data.message}!!!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                setactive(!active)
            }
        }
        catch(err){
            console.log(`Error in Handle Login -${err}`)
        }
    }

    useEffect(() =>{
        verifyToken()
    }, [active])

  return (
    <section className='min-h-screen flex items-center justify-center'>
        <div className='bg-white shadow-md rounded-lg px-8 shadow-slate-400 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={() =>handleLogin(event)} action="">
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
                    <input value={email} onChange={(event) =>setemail(event.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Enter your email' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input value={password} onChange={(event) =>setpassword(event.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
            </form>
        </div>
    </section>
  )
}

export default Login