import { Tooltip, ActionIcon } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons'

export default function GithubButton() {
  return (
    <Tooltip label="Source Code">
      <a href="https://github.com/michaelmagen/birthday-reminder">
        <ActionIcon variant="light" color="gray" size="lg" radius="md">
          <IconBrandGithub />
        </ActionIcon>
      </a>
    </Tooltip>
  )
}
