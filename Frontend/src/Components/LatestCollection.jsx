import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [latest, setlatest] = useState([])

    async function getLatestProducts(){
        try{
            setlatest(products.slice(0,10))
        }
        catch(err){
            console.log(`Error in Get Latest Products - ${err}`)
        }
    }

    useEffect(() =>{
        getLatestProducts()
    }, [products])

  return (
    <section className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={`LATEST`} text2={`COLLECTIONS`} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, hic.</p>
        </div>
        
        {/* Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latest.map((element, index) =>(
                <ProductItem key={index} id={element._id} image={element.image} name={element.name} price={element.price} />
            ))}
        </div>
    </section>
  )
}

export default LatestCollection