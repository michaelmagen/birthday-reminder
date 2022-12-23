import { Button, ActionIcon, useMantineColorScheme } from '@mantine/core'

export default function ThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Button
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      size="sm"
    >
      {dark ? 'Light' : 'Dark'}
    </Button>
  )
}
