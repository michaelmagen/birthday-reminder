import {
  Skeleton,
  List,
  ThemeIcon,
  ActionIcon,
  Group,
  Space,
  Divider,
  Text,
  Center,
  Paper,
} from '@mantine/core'
import { IconUser, IconTrash } from '@tabler/icons'

export default function BirthdayList({ birthdayData, loading }) {
  // loading skeleton while the data is being fetched
  if (loading) {
    return (
      <>
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </>
    )
  }

  if (birthdayData === null) {
    return (
      <Text align="center" fz="xl">
        Select a date to show the birthdays on that date!
      </Text>
    )
  }

  // there are no birthdays on the selected day
  if (birthdayData.length === 0) {
    return (
      <Text align="center" fz="xl">
        No birthdays on this day!
      </Text>
    )
  }

  return (
    <>
      {birthdayData.map((birthdayEntry) => (
        <Center key={birthdayEntry.id}>
          <Paper
            shadow="xs"
            radius="xl"
            px="xl"
            py="sm"
            my=".4rem"
            w={850}
            withBorder
          >
            <Group position="apart">
              {birthdayEntry.name}
              <ActionIcon variant="light" color="red" radius="md">
                <IconTrash />
              </ActionIcon>
            </Group>
          </Paper>
        </Center>
      ))}
    </>
  )
}
