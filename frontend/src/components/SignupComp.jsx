import React from 'react';
import { Formik, Field, Form } from 'formik';
import ReactCurvedText from 'react-curved-text';
import './loginstyle.css';
import { useNavigate } from 'react-router-dom';
import { UseAuthStore } from '../store/authUser';

export default function SignupComp() {
  const navigate = useNavigate();
  const { signup } = UseAuthStore();

  const handleSignUp = (values) => {
    console.log('Email:', values.email);
    console.log('Username:', values.username);
    console.log('Password:', values.password);
    signup({
      email: values.email,
      username: values.username,
      password: values.password,
    });
    // navigate('/home'); 
  };

  return (
    <div className='login'>
      <h1>
        <ReactCurvedText
          width='384'
          height='117'
          cx='100'
          cy='76'
          rx='175'
          ry='31'
          startOffset='85'
          reversed={true}
          text='Streamio'
          textProps={{ style: { fontSize: '60' } }}
          textPathProps={{ fill: '#FF0000' }}
          tspanProps={null}
          ellipseProps={{ fill: 'none', stroke: 'none' }}
          svgProps={null}
        />
      </h1>
      <div className='Image'>
        <img
          alt='img'
          src='https://gtwallpaper.org/sites/default/files/wallpaper/246844/netflix-background-246844-2224740-3441109.png'
        />
      </div>

      <div className='form'>
        <h2>Sign Up</h2>
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          onSubmit={handleSignUp}
        >
          {({ handleChange, values }) => (
            <Form className='container'>
              <Field
                name='email'
                type='email'
                className='input-field'
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
              />
              <Field
                name='username'
                type='text'
                className='input-field'
                placeholder='Username'
                value={values.username}
                onChange={handleChange}
              />
              <Field
                name='password'
                type='password'
                className='input-field'
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
              />
              <button type='submit' className='sbtn'>
                Sign Up
              </button>

              <div className='signupcontainer'>
                <p>Already Have an Account? </p>
                <a href='./'>Log In</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
