import React from 'react'
import logoImg from '../assets/logo.png'

const Footer = () => {
  return (
    <footer>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm my-10'>
            <div>
                <img src={logoImg} className='mb-5 w-32' alt="logoImg" />
                <p className='text-gray-600 w-full md:w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ad commodi soluta veritatis minima ipsa nemo quaerat error tempore animi.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 9876543210</li>
                    <li>forever@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved</p>
        </div>
    </footer>
  )
}

export default Footer