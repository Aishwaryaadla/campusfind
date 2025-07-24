import React from 'react'
import Navbar from '../components/Navbar'
import RateLimit from '../components/RateLimit'
import { useState } from 'react'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import HowItWorks from '../components/HowItWorks'
import PopularCategories from '../components/PopularCategories'



const HomePage = () => {
  const [rateLimited,setRateLimited] = useState(false);

  return (
    <div className='min-h-screen'>
      <Navbar />
      
      {rateLimited && <RateLimit/>}

      <main>
        <HeroSection />
        {<HowItWorks />}
        {<PopularCategories />}
      </main>

      <Footer />      

    </div>
  )
}

export default HomePage
