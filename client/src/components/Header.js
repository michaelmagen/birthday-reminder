import { Header, Title, Group, createStyles, Container } from '@mantine/core'
import { useLocation } from 'react-router-dom'
import ThemeButton from './ThemeButton'
import GithubButton from './GithubButton'
import SignOutButton from './SignOutButton'
import HeaderMenu from './HeaderMenu'

const useStyles = createStyles((theme) => ({
  inner: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttons: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}))

export default function SiteHeader() {
  const { classes } = useStyles()
  // get the current route location
  const location = useLocation()

  return (
    <Header mb={20}>
      <Container fluid px="xl">
        <div className={classes.inner}>
          <Title order={2} weight={1000} align="center">
            🎉 Birthday Reminders🎉
          </Title>
          <HeaderMenu />
          <Group spacing="lg" className={classes.buttons}>
            <GithubButton />
            <ThemeButton />
            {/* show logout when at home path */}
            {location.pathname === '/' ? <SignOutButton /> : null}
          </Group>
        </div>
      </Container>
    </Header>
  )
}
