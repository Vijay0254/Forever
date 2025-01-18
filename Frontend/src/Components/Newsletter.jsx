import React from 'react'

const Newsletter = () => {

    function handleSubmit(event){
        event.preventDefault()
    }

  return (
    <section className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id tempora accusantium a natus rerum.</p>
        <form onSubmit={() =>handleSubmit(event)} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter your email' required className='w-full sm:flex-1 outline-none' />
            <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
        </form>
    </section>
  )
}

export default Newsletter