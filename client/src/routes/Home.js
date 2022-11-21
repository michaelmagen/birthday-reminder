import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const { logout } = useAuth()

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
