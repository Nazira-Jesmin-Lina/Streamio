import React from 'react'
import Navbar from '../components/Navbar'
import './searchstyle.css'
import Home from './Home'

export default function Search() {
  return (
    <div className='responsive-media'>
      <Home/>
      <input className='search-box' placeholder='Search here'>
      </input>
    </div>
  )
}
