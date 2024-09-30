import React from 'react'

import Home from './pages/home/Home'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'

import { Toaster } from 'react-hot-toast'

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from './context/AuthContext'

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="login" />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
