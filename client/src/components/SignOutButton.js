import { Button } from '@mantine/core'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IconLogout } from '@tabler/icons'

export default function SignOutButton() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  // log user out of app and navigate to login page
  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant="light"
      color="red"
      radius="md"
      leftIcon={<IconLogout />}
    >
      Sign out
    </Button>
  )
}
