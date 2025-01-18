import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import searchIcon from '../assets/search_icon.png'
import crossIcon from '../assets/cross_icon.png'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    
    const { search, setsearch, showSearch, setshowSearch } = useContext(ShopContext)
    const [visible, setvisible] = useState(false)
    const location = useLocation()

    useEffect(() =>{
        if(location.pathname.includes('collection')){
            setvisible(true)
        }
        else{
            setvisible(false)
        }
    }, [location])

    return (showSearch && visible) ? (
        <section className='border-t border-b bg-gray-50 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} onChange={(event) =>setsearch(event.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
                <img src={searchIcon} className='w-4' alt="searchIcon" />
            </div>
            <img className='inline w-3 cursor-pointer' src={crossIcon} onClick={() =>setshowSearch(false)} alt="crossIcon" />
        </section>
  ) : <></>
}

export default SearchBar