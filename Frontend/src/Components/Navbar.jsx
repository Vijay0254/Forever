import React, { useContext, useState } from 'react'
import logoImg from '../assets/logo.png'
import searchIcon from '../assets/search_icon.png'
import profileIcon from '../assets/profile_icon.png'
import cartIcon from '../assets/cart_icon.png'
import menuIcon from '../assets/menu_icon.png'
import dropdownIcon from '../assets/dropdown_icon.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { useEffect } from 'react'
import axios from '../Utils/Axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const [visible, setvisible] = useState(false)
    const navigate = useNavigate()
    const { setshowSearch, getCartCount, user, verifyToken, verifyToken2 } = useContext(ShopContext)

    useEffect(() =>{
        verifyToken2()
    }, [])
    // console.log(user)

    async function handleLogout(){
        try{
            const response = await axios.get(`/api/auth/user/logout`, {withCredentials: true, headers: {'Origin': 'https://forever-frontend-sandy.vercel.app', 'Content-Type': 'application/json'}})
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(response.data.success){
                window.location.href = '/'
            }
        }
        catch(err){
            console.log(`Error in Handle logout - ${err}`)
        }
    }

  return (
    <nav className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'><img src={logoImg} className='w-36' alt="logoImg" /></Link>
        
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p className='uppercase'>Home</p>
                <hr className='w-1/2 border-none h-[1.5px] bg-slate-700 hidden' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p className='uppercase'>Collection</p>
                <hr className='w-1/2 border-none h-[1.5px] bg-slate-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p className='uppercase'>About</p>
                <hr className='w-1/2 border-none h-[1.5px] bg-slate-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p className='uppercase'>Contact</p>
                <hr className='w-1/2 border-none h-[1.5px] bg-slate-700 hidden' />
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
            <img onClick={() =>setshowSearch(true)} src={searchIcon} alt="searchIcon" className='w-5 cursor-pointer' />
            {!user ? 
                <Link to='/login'><img src={profileIcon} alt="profileIcon" className='w-5 cursor-pointer' /></Link> :
                <div className='group relative'>
                    <img src={profileIcon} alt="profileIcon" className='w-5 cursor-pointer' />
                    <div className='group-hover:block hidden absolute right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p onClick={() =>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={() =>handleLogout()} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
            }

            <Link to='/cart' className='relative'>
                <img src={cartIcon} className='w-5 min-w-5' alt="cartIcon" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            <img onClick={() =>setvisible(true)} src={menuIcon} alt="menuIcon" className='w-5 cursor-pointer sm:hidden' />
        </div>

        {/* Sidebar Menu for Mobile */}
        <div className={`absolute top-0 right-0 bottom-0 transition-all overflow-hidden bg-white ${visible ? "w-full" : "w-0"}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={() =>setvisible(false)} className='flex items-center cursor-pointer gap-4 p-3'>
                    <img src={dropdownIcon} alt="dropdownIcon" className='h-4 rotate-180' />
                    <p>Back</p>
                </div>
                <NavLink onClick={() =>setvisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                <NavLink onClick={() =>setvisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={() =>setvisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                <NavLink onClick={() =>setvisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
            </div>
        </div>

    </nav>
  )
}

export default Navbar