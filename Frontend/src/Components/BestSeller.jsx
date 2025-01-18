import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)
    const [bestSeller, setbestSeller] = useState([])

    async function getBestSeller(){
        try{
            const bestProduct = products.filter((element) =>element.bestseller === true)
            setbestSeller(bestProduct.slice(0,5))
        }
        catch(err){
            console.log(`Error in Get Best Seller - ${err}`)
        }
    }

    useEffect(() =>{
        getBestSeller()
    }, [products])

  return (
    <section className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={`BEST`} text2={`SELLERS`} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vitae error dolorum saepe illo nulla assumenda inventore dolore? Voluptates, corporis.</p>

            {/* Products */}
            <div className='gap-4- gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                {bestSeller.map((element, index) =>(
                    <ProductItem key={index} id={element._id} image={element.image} name={element.name} price={element.price} />
                ))}
            </div>
        </div>
    </section>
  )
}

export default BestSeller