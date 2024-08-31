import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter, Routes, Route,Navigate 
} from "react-router-dom";

import Login from './Screens/Login';
import Home from './Screens/Home';
import TVShows from './Screens/TVShows';
import MyList from './Screens/MyList';
import Movies from './Screens/Movies';
import NewPopular from './Screens/NewPopular';
import Search from './Screens/Search';
import Detailpage from './components/Detailpage';
import SignUp from './Screens/SignUp';
import { ToastBar, Toaster } from 'react-hot-toast';
import { UseAuthStore } from './store/authUser';
import React, { useEffect } from 'react';


function App() {
  const { user, isCheckingAuth, authCheck } = UseAuthStore();
  console.log("auth user is here:",user);

	useEffect(()=>{
     authCheck();

  },[authCheck]);

  return (
    <div className="App">
      <Routes>
      <Route path='/' element= {user ? <Navigate to="/home" />:<Login/>}/>
      <Route path='/signup' element={user ? <Navigate to="/home" /> : <SignUp />} />
      <Route path='/home' element= {<Home/>}/>
      <Route path='/tvshows' element= {<TVShows/>}/>
      <Route path='/mylist' element= {<MyList/>}/>
      <Route path='/movies' element= {<Movies/>}/>
      <Route path='/new&popular' element= {<NewPopular/>}/>
      <Route path='/search' element= {<Search/>}/>
      <Route path='/detailpage/:id/:type' element={<Detailpage />} /> 
      </Routes>

      <Toaster/>
        
    </div>
  );
}

export default App;
