import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const { session, logout } = useAuth()

  // if user not logged in, send them to login page
  useEffect(() => {
    if (!session) {
      navigate('/login')
    }
  }, [session, navigate])

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <button onClick={handleLogout}>log out</button>
      <p>this is the home page</p>
    </>
  )
}
