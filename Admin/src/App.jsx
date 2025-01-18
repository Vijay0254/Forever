import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Add from './Pages/Add'
import List from './Pages/List'
import Order from './Pages/Order'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { useContext } from 'react'
import { userContext } from './Context/UserContext'
import { useEffect } from 'react'
import Error_500 from './Error_Pages/Error_500'
import Error_404 from './Error_Pages/Error_404'

const App = () => {

    const { token, verifyToken } = useContext(userContext)

    useEffect(() =>{
      verifyToken()
    }, [token])  

  return (
    <main className='bg-gray-50 min-h-screen'>
      { !token ? 
        <Login /> :
        <>
        <Navbar />
        <hr />
        <div className='flex w-full'>
          <Sidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/add' element={<Add />} />
              <Route path='/' element={<List />} />
              <Route path='/orders' element={<Order />} />
              <Route path='/500' element={<Error_500 />} />
              <Route path='*' element={<Error_404 />} />
            </Routes>
          </div>
        </div>
      </>}
    </main>
  )
}

export default App