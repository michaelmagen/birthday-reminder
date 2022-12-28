import { Tooltip, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons'

export default function ThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Tooltip label="Toggle theme">
      <ActionIcon
        variant="light"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle theme"
        size="lg"
        radius="md"
      >
        {dark ? <IconSun /> : <IconMoonStars />}
      </ActionIcon>
    </Tooltip>
  )
}
