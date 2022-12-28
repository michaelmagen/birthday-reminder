import { useState } from 'react'
import {
  Menu,
  Burger,
  createStyles,
  useMantineColorScheme,
} from '@mantine/core'
import {
  IconBrandGithub,
  IconSun,
  IconMoonStars,
  IconLogout,
} from '@tabler/icons'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  menu: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  button: {
    width: 100,
  },

  link: {
    textDecoration: 'none',
  },
}))

export default function HeaderMenu() {
  const { classes } = useStyles()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [opened, setOpened] = useState(false)
  const dark = colorScheme === 'dark'

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={classes.menu}>
      <Menu shadow="md" opened={opened} onChange={setOpened}>
        <Menu.Target>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Options</Menu.Label>
          <Menu.Item
            icon={dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
          >
            Toggle Theme
          </Menu.Item>
          <a
            className={classes.link}
            href="https://github.com/michaelmagen/birthday-reminder"
          >
            <Menu.Item icon={<IconBrandGithub size={20} />}>
              Source Code
            </Menu.Item>
          </a>
          {location.pathname === '/' ? (
            <Menu.Item
              icon={<IconLogout size={20} />}
              color="red"
              onClick={handleLogout}
            >
              Sign out
            </Menu.Item>
          ) : null}
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}
