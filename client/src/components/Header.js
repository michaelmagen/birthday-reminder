import { Header, Title, Group, createStyles, Button } from '@mantine/core'
import ThemeButton from './ThemeButton'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  inner: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 100,
    paddingLeft: 100,
  },
}))

export default function SiteHeader() {
  const { classes } = useStyles()
  const { logout } = useAuth()
  const navigate = useNavigate()
  // get the current route location
  const location = useLocation()

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
    <Header mb={20}>
      <div className={classes.inner}>
        <Title order={1} weight={1000} align="center">
          🎉 Birthday Reminders 🎉
        </Title>
        <Group spacing="xl">
          {/* show logout when at home path */}
          {location.pathname === '/home' ? (
            <Button onClick={handleLogout}> Sign out</Button>
          ) : null}
          <ThemeButton />
        </Group>
      </div>
    </Header>
  )
}
