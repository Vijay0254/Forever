import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Product from './Pages/Product'
import Contact from './Pages/Contact'
import Orders from './Pages/Orders'
import Placeorder from './Pages/Placeorder'
import Cart from './Pages/Cart'
import Collection from './Pages/Collection'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
import VerifyStripe from './Pages/VerifyStripe'
import Error_500 from './Error_Pages/Error_500'
import Error_404 from './Error_Pages/Error_404'

const App = () => {
  return (
    <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<Placeorder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/verify' element={<VerifyStripe />} />
        <Route path='/500' element={<Error_500 />} />
        <Route path='*' element={<Error_404 />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App