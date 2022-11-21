import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './routes/Login'
import Home from './routes/Home'
import ErrorPage from './ErrorPage'
import Register from './routes/Register'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Link to={'/login'}>Login</Link>
        <Link to={'/home'}>Home</Link>
        <Link to={'/register'}>register</Link>

        <Routes>
          <Route
            path="/login"
            element={<Login />}
            errorElement={<ErrorPage />}
          />
          <Route path="/home" element={<Home />} errorElement={<ErrorPage />} />
          <Route
            path="/register"
            element={<Register />}
            errorElement={<ErrorPage />}
          />
        </Routes>
        <div>This is a footer from app.js</div>
      </BrowserRouter>
    </AuthProvider>
  )
}
