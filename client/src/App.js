import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import ErrorPage from './ErrorPage'
import Register from './routes/Register'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <Link to={'/login'}>Login</Link>
      <Link to={'/home'}>Home</Link>
      <Link to={'/register'}>register</Link>

      <Routes>
        <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate replace to="/login" />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/register"
          element={<Register />}
          errorElement={<ErrorPage />}
        />
      </Routes>
      <button onClick={() => setUser('ji')}> add a user</button>
      <div>This is a footer from app.js</div>
    </BrowserRouter>
  )
}
