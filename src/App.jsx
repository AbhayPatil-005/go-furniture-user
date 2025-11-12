import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpPage from './pages/auth/SignUpPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/signup' element={<SignUpPage/>}/>
    </Routes>
   
    </>
  )
}

export default App
