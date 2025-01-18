import axios from '../utils/Axios'
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { userContext } from '../Context/UserContext';

import logoImg from '../assets/logo.png'

const Navbar = () => {

    const navigate = useNavigate()

    async function handleLogout(event){
        event.preventDefault()
        try{
            const response = await axios.get(`/api/auth/admin/logout`, {withCredentials: true})
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
                window.location.href = '/'
            }
        }
        catch(err){
            console.log(`Error in Handle Logout -${err}`)
        }
    }
    
  return (
    <nav className='flex items-center py-2 px-[4%] justify-between'>
        <img src={logoImg} className='w-[max(10%,80px)]' alt="logoImg" />
        <button onClick={() =>handleLogout(event)} className='bg-gray-600 text-xs sm:text-sm text-white px-5 py-2 sm:px- sm:py-2 rounded-full'>Logout</button>
    </nav>
  )
}

export default Navbar