import React from 'react'
import { NavLink } from 'react-router-dom'
import addIcon from '../assets/add_icon.png'
import orderIcon from '../assets/order_icon.png'

const Sidebar = () => {
  return (
    <nav className='w-[18%] border-r-2 min-h-screen'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg`} to='/add'>
                <img className='w-5 h-5' src={addIcon} alt="addIcon" />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg`} to='/'>
                <img className='w-5 h-5' src={orderIcon} alt="addIcon" />
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg`} to='/orders'>
                <img className='w-5 h-5' src={orderIcon} alt="addIcon" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </nav>
  )
}

export default Sidebar