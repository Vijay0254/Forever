import React from 'react'
import { BiSolidError } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

const Error_500 = () => {
  return (
    <section className='flex auth-bg gap-y-1 md:gap-y-4 h-[70%] justify-center items-center flex-col'>
        <div className='bg-white flex justify-center gap-3 flex-col items-center xl:p-20 p-4 md:p-20 rounded'>
            <div className='flex text-center flex-row-reverse font-playfair gap-4 md:gap-1 lg:gap-6 items-center text-4xl md:text-7xl lg::text-8xl font-bold text-slate-600'>
                <h1 className=''>Error 500</h1>
                <BiSolidError />
            </div>
            <h3 className='text-3xl md:text-5xl lg:text-6xl font-bold flex text-center font-playfair text-slate-500'>Internal Server Error</h3>
            {/* <Link className='flex items-center gap-x-2 text-xl underline text-blue-600' to='/'>Home <span className='pt-2'><FaArrowRightLong /></span></Link> */}
        </div>
    </section>
  )
}

export default Error_500