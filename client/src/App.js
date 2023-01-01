import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './routes/Login'
import Home from './routes/Home'
import ErrorPage from './ErrorPage'
import Register from './routes/Register'
import SiteHeader from './components/Header'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

export default function App() {
  // sets the color scheme, saves color scheme in local storage
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <AuthProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            components: {
              Button: {
                defaultProps: {
                  color: colorScheme === 'dark' ? 'green' : 'blue',
                  radius: 'md',
                  variant: 'light',
                },
              },
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <BrowserRouter>
            <SiteHeader />

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
          </BrowserRouter>
        </MantineProvider>
      </ColorSchemeProvider>
    </AuthProvider>
  )
}
