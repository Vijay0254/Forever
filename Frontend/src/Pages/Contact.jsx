import React from 'react'
import Title from '../Components/Title'
import contactImg from '../assets/contact_img.png'

const Contact = () => {
  return (
    <section>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={contactImg} alt="contactImg" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>547 Masthan kori <br /> Suite 350, India</p>
          <p className='text-gray-500'>Tel: (+91) 9876543210 <br /> Email: forever@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black transition-all hover:text-white duration-500'>Explore Jobs</button>
        </div>
      </div>
    </section>
  )
}

export default Contact