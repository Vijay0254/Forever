import React, { useState } from 'react'
import axios from '../Utils/Axios'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Login = () => {

  const [currentState, setcurrentState] = useState("Login")
  const { user, verifyToken, verifyToken2 } = useContext(ShopContext)
  const navigate = useNavigate()

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [activate, setactivate] = useState(false)
  
  async function handleLoginAndSignup(event){
    event.preventDefault()
    try{
      if(currentState === "Sign Up"){
        const response = await axios.post(`/api/auth/user/signup`, {name: name, email: email, password: password}, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
        if(response.data.message == "Internal Server Error"){
          navigate('/500')
        }
        if(!response.data.success){
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
          toast.success('Registration Success!!!', {
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
      else{
        const response = await axios.post(`/api/auth/user/login`, {email: email, password: password}, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
        if(response.data.message == "Internal Server Error"){
          navigate('/500')
        }
        if(!response.data.success){
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
          toast.success('Login Success!!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            setactivate(!activate)
            navigate('/')
        }
      }
    }
    catch(err){
      console.log(`Error in Handle Login and Signup - ${err}`)
    }
  }

  useEffect(() =>{
    verifyToken2()
  }, [activate])

  return (
    <form onSubmit={() =>handleLoginAndSignup(event)} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState == 'Sign Up' && <input value={name} onChange={(event) =>setname(event.target.value)} required type="text" placeholder='Name' className='w-full px-3 py-2 border border-gray-800' />}
      <input value={email} onChange={(event) =>setemail(event.target.value)} required type="email" placeholder='Email' className='w-full px-3 py-2 border border-gray-800' />
      <input value={password} onChange={(event) =>setpassword(event.target.value)} required type="password" placeholder='Password' className='w-full px-3 py-2 border border-gray-800' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {
          currentState === 'Login' ? <p className='cursor-pointer'>Forgot your password?</p> : <p></p>
        }
        {
          currentState === 'Login' ? <p onClick={() =>setcurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> : <p onClick={() =>setcurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState}</button>
    </form>
  )
}

export default Login