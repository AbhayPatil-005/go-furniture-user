import { useState } from 'react'
import './App.css'
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';

function App() {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  return (
    <>
    <Routes>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<HomePage/>}>
      <Route path='category/:categoryName' element={<CategoryPage />} />

      </Route>
    </Routes>
   
    </>
  )
}

export default App
