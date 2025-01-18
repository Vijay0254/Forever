import React from 'react'
import exchangeIcon from '../assets/exchange_icon.png'
import qualityIcon from '../assets/quality_icon.png'
import supportIcon from '../assets/support_img.png'

const OurPolicy = () => {
  return (
    <section className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs md:text-base text-gray-700'>
        <div>
            <img src={exchangeIcon} className='w-12 m-auto mb-5' alt="exchangeIcon" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer free exchange policy</p>
        </div>
        <div>
            <img src={qualityIcon} className='w-12 m-auto mb-5' alt="exchangeIcon" />
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div>
            <img src={exchangeIcon} className='w-12 m-auto mb-5' alt="exchangeIcon" />
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
    </section>
  )
}

export default OurPolicy