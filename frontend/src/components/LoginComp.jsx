import React, { useState } from 'react'
import { Formik, Field, Form } from "formik";
import ReactCurvedText from 'react-curved-text';
import './loginstyle.css'
import { 
  BrowserRouter, Routes, Route, useNavigate 
} from "react-router-dom";
import { UseAuthStore } from '../store/authUser';


export default function LoginComp() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} =UseAuthStore();

  const handleLogin = (values) => {
    console.log('Email:', values.email);
    console.log('Password:', values.password);
    login({
      email: values.email,
      username: values.username,
      password: values.password,
    });
    
  };

    
  const redirectToHome = () => {
    navigate('/home'); 
  };

  return (
    <div className='login'>
         <h1><ReactCurvedText width='384'
          height='117'
          cx='100'
          cy='76'
          rx='175'
          ry='31'
          startOffset='85'
          reversed={true}
          text='Streamio'
          textProps={{"style": {"fontSize": "60"}}}
          textPathProps={{ "fill": "#FF0000"}}
          tspanProps={null}
          ellipseProps={{ "fill": "none", "stroke": "none" }}
          svgProps={null} /></h1>
      <div className='Image'>
     
        <img alt='img'
        src='https://gtwallpaper.org/sites/default/files/wallpaper/246844/netflix-background-246844-2224740-3441109.png'/>

      </div>

      <div className='form'>
        <h2>Sign In</h2>
      <Formik
         initialValues={{ email: '', password: '' }}
         onSubmit={handleLogin}
      >
        {({ handleChange, values }) => (
        <Form className='container'>
          <Field name="email" 
          type="email"  
          className="input-field"  
          placeholder='Email'
          value={values.email}
          onChange={handleChange}
          />
          <Field name="password" 
          type="password"  
          className="input-field"  
          placeholder='password'
          value={values.password}
          onChange={handleChange}
          />
          <button type="submit" className='sbtn' >Sign In</button>
          <p>OR</p>
          <button className='codebtn'>Use a Sign Code</button>
          <a href='./forget' className='forget'>Forget Password?</a>
          <div className='remember'>
          <i class="fa-solid fa-square-check"></i>
          <p>Remember me</p>
          </div>
          <div className='signupcontainer'>
            <p>New to Streamio? </p>
            <a href='./signup'>Sign Up now</a>
          </div>
          

        </Form>
        )}
      </Formik>
        
      </div>
    </div>
  )
}
