import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdownIcon from '../assets/dropdown_icon.png'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setshowFilter] = useState(false)
  const [filterProducts, setfilterProducts] = useState([])
  const [category, setcategory] = useState([])
  const [subCategory, setsubCategory] = useState([])
  //const [sortType, setsortType] = useState('relavent')
  
  function toggleCategory(event){
    if(category.includes(event.target.value)){
      setcategory((prev) =>prev.filter((element) =>element !== event.target.value))
    }
    else{
      setcategory((prev) =>[...prev, event.target.value])
    }
  }

  function toggleSubCategory(event){
    if(subCategory.includes(event.target.value)){
      setsubCategory((prev) =>prev.filter((element) =>element !== event.target.value))
    }
    else{
      setsubCategory((prev) =>[...prev, event.target.value])
    }
  }

  function applyFilter(){
    let productsCopy = products.slice()

    if(category.length > 0){
      productsCopy = productsCopy.filter((element) =>category.includes(element.category))
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter((element) =>subCategory.includes(element.subCategory))
    }

    if(showSearch && search){
      productsCopy = productsCopy.filter((element) =>element.name.toUpperCase().includes(search.toUpperCase()))
    }
    
    setfilterProducts(productsCopy)
  }

  function sortProducts(sortType){
    let productsCopy = filterProducts.slice()
    switch(sortType){
      case 'low-high':
        setfilterProducts(productsCopy.sort((a, b) =>(a.price - b.price)))
        break;
      case 'high-low':
        setfilterProducts(productsCopy.sort((a, b) =>(b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
      }
  }

  useEffect(() =>{
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() =>{
    setfilterProducts(products)
  }, [products])

  return (
    <section className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Option */}
      <div className='min-w-60'>
        <p onClick={() =>setshowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={dropdownIcon} alt="dropdownIcon" /></p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={() =>toggleCategory(event)} type="checkbox" className='w-3' value={'Men'} /> Men
            </p>
            <p className='flex gap-2'>
              <input onChange={() =>toggleCategory(event)} type="checkbox" className='w-3' value={'Women'} /> Women
            </p>
            <p className='flex gap-2'>
              <input onChange={() =>toggleCategory(event)} type="checkbox" className='w-3' value={'Kids'} /> Kids
            </p>
          </div>
        </div>

        {/* Sub-Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={() =>toggleSubCategory(event)} type="checkbox" className='w-3' value={'Topwear'} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input onChange={() =>toggleSubCategory(event)} type="checkbox" className='w-3' value={'Bottomwear'} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input onChange={() =>toggleSubCategory(event)} type="checkbox" className='w-3' value={'Winterwear'} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort */}
          <select onChange={(event) =>sortProducts(event.target.value)} className='border-gray-300 text-sm px-2 border-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((element, index) =>(
            <ProductItem key={index} id={element._id} image={element.image} name={element.name} price={element.price} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Collection