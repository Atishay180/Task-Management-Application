import React from 'react'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import {Routes, Route} from "react-router-dom"
import Home from './pages/home/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
