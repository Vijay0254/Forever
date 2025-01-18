import React from 'react'
import heroImg from '../assets/hero_img.png'

const Hero = () => {
  return (
    <section className='flex mt-3 flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium uppercase text-sm md:text-base'>Our Bestseller</p>
                </div>
                <h1 className='text-3xl prata-regular sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold uppercase text-sm md:text-base'>Shop Now</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
        </div>

        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2' src={heroImg} alt="heroImg" />
    </section>
  )
}

export default Hero