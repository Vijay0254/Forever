import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import Newsletter from '../Components/Newsletter'

const Home = () => {
  return (
    <>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <Newsletter />
    </>
  )
}

export default Home