import React from 'react'
import './footerstyle.css'

export default function Footer() {
  return (
    <div className='footer'>
      <div className='first'>
        Question? Contact us
        
      </div>
      <div className='second'>
        <li>
          <a href='/'>FAQ</a>
          <a href='/'>Help Center</a>
          <a href='/'>Terms of Use</a>
          <a href='/'>Privacy</a>
        </li>

      </div>
      <div className='third'>
        <li>
        <a href='/'>Cookie preference</a>
        <a href='/'>Corporate Information</a>
        </li>

      </div>
      <div className='fourth'>
        
      </div>
    </div>
  )
}
