import React from 'react'
import Navbar from '../components/Navbar'
import Homepagecomp from '../components/Homepagecomp'
import Hero from '../components/Hero'
import WathingSec from '../components/WathingSec'
import Topten from '../components/Topten'
import Footer from '../components/Footer'
import PopularHero from '../components/PopularHero'
import Upcoming from '../components/Upcoming'
import TrendinTV from '../components/TrendingTV'
import { UseAuthStore } from '../store/authUser'

export default function Home() {

  
  
   


  return (
    <div className='responsive-media'>
      <Navbar/>
      <Homepagecomp/>
      <PopularHero/>
      <WathingSec/>

      

    <Topten
      title="Top 10 Movies Today"
    
    />

      <Upcoming/>

    <TrendinTV/>

    
   
    <Footer/>
    </div>
    
  )
}
