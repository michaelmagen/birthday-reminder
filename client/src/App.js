import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './routes/Login'
import Home from './routes/Home'
import ErrorPage from './ErrorPage'
import Register from './routes/Register'
import SiteHeader from './components/Header'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'

export default function App() {
  const [colorScheme, setColorScheme] = useState('light')
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <AuthProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <BrowserRouter>
            <SiteHeader />
            <Link to={'/login'}>Login</Link>
            <Link to={'/'}>Home</Link>
            <Link to={'/register'}>register</Link>

            <Routes>
              <Route
                path="/login"
                element={<Login />}
                errorElement={<ErrorPage />}
              />
              <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
              <Route
                path="/register"
                element={<Register />}
                errorElement={<ErrorPage />}
              />
            </Routes>
            <div>This is a footer from app.js</div>
          </BrowserRouter>
        </MantineProvider>
      </ColorSchemeProvider>
    </AuthProvider>
  )
}
