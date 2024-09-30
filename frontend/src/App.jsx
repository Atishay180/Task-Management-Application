import React from 'react'

import Home from './pages/home/Home'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'

import { Toaster } from 'react-hot-toast'

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from './context/AuthContext'
import Sidebar from './components/common/Sidebar'
import CreateTask from './components/crud/CreateTask'
import EditTask from './components/crud/EditTask'
import RemoveTask from './components/crud/RemoveTask'

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className='flex bg-gray-100'>
      <Sidebar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="login" />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />

        <Route path="/create" element={authUser ? <CreateTask /> : <Navigate to="login" />} />
        <Route path="/edit" element={authUser ? <EditTask /> : <Navigate to="login" />} />
        <Route path="/remove" element={authUser ? <RemoveTask /> : <Navigate to="login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
