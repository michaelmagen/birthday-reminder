import { useState } from 'react'
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
  Table,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import birthdayService from '../services/bday'
import { useMutation, useQueryClient } from 'react-query'

export default function BirthdayList({ birthdayData, loading }) {
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (id) => {
      return birthdayService.removeBirthday(id)
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('birthdays')
      },
    }
  )

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
        Select a month to show that month's birthdays!
      </Text>
    )
  }

  // there are no birthdays on the selected day
  if (birthdayData.length === 0) {
    return (
      <Text align="center" fz="xl">
        No birthdays on this month!
      </Text>
    )
  }
  // function key for sorting data by day in ascending order
  function sortByDay(a, b) {
    let comparison = 0
    if (a.day > b.day) {
      comparison = 1
    } else if (a.day < b.day) {
      comparison = -1
    }
    return comparison
  }

  return (
    <>
      {/* {birthdayData.sort(sortByDay).map((birthdayEntry) => (
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
              {birthdayEntry.day}: {birthdayEntry.name}
              <ActionIcon
                variant="light"
                color="red"
                radius="md"
                //onClick={() => handleDeleteButtonClick(birthdayEntry.id)}
              >
                <IconTrash />
              </ActionIcon>
            </Group>
          </Paper>
        </Center>
      ))} */}
      <Center>
        <Table horizontalSpacing="lg" w={850} highlightOnHover fontSize="xl">
          <thead>
            <tr>
              <th>Day</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {birthdayData.sort(sortByDay).map((birthdayEntry) => (
              <tr key={birthdayEntry.id}>
                <td>{birthdayEntry.day}</td>
                <td>{birthdayEntry.name}</td>
                <td>
                  {' '}
                  <ActionIcon
                    variant="light"
                    color="red"
                    radius="md"
                    onClick={() => mutation.mutate(birthdayEntry.id)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Center>
    </>
  )
}
