import { useState } from 'react'
import {Provider} from "react-redux"
import "./App.css";
import { Navbar } from "./components/navbar";
import { Taskboard } from './components/taskboard';
import { Login } from './components/loginpage';
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import { useEffect } from "react";

import React from 'react';
import { Homepage } from './components/homepage';
import store from './components/redux/store';

function App() {
  const [count, setCount] = useState(0)



  const [isLoggedIn, setIsLoggedIn] = useState(true);

   function handleLoginSuccess ()  {
  
     setIsLoggedIn(true);
  console.log(`hitted`);
  console.log(isLoggedIn);



  // navigate('/home');
  };
  return (
    <>
      <div className='App'>
     
      

       
<Provider store={store}>

<BrowserRouter >

          <Routes>
         <Route path="/" element={<Taskboard />} /> 

          <Route path="/home" element={< Homepage />} /> 
         
          
          </Routes>
        </BrowserRouter>

</Provider>






     
      </div>
    




     
    </>
  )
}

export default App
