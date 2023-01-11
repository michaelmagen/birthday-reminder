import { useState } from 'react'
import { Button } from '@mantine/core'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IconLogout } from '@tabler/icons'

export default function SignOutButton() {
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // log user out of app and navigate to login page
  async function handleLogout() {
    try {
      setLoading(true)
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <Button
      onClick={handleLogout}
      variant="light"
      color="red"
      radius="md"
      loading={loading}
      leftIcon={<IconLogout />}
    >
      Sign out
    </Button>
  )
}
