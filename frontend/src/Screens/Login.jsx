import React from 'react'
import LoginComp from '../components/LoginComp'
import Footer from '../components/Footer'
import { UseAuthStore } from '../store/authUser'


export default function Login() {
  
  return (
    <div>
      <LoginComp/>
      <Footer/>
    </div>
  )
}
