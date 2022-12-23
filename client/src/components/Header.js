import { Header, Title, Group } from '@mantine/core'
import ThemeButton from './ThemeButton'

export default function SiteHeader() {
  return (
    <Header height={60} p="xs" color="red">
      <Group position="apart">
        <Title order={1} weight={1000} align="center">
          🎉 Birthday Reminders 🎉
        </Title>
        <ThemeButton />
      </Group>
    </Header>
  )
}
