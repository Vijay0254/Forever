import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext)
    const [related, setrelated] = useState([])

    function getRelatedProducts(){
        if(products.length > 0){
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((element) =>category === element.category)
            productsCopy = productsCopy.filter((element) =>subCategory === element.subCategory)
            setrelated(productsCopy.slice(0,5))
        }
    }

    useEffect(() =>{
        getRelatedProducts()
    }, [])

  return (
    <section className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>

        <div className='grid mt-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((element, index) =>(
                    <ProductItem key={index} id={element._id} image={element.image} name={element.name} price={element.price} />
                ))
            }
        </div>
    </section>
  )
}

export default RelatedProducts