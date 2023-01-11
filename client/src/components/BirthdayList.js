import { useState } from 'react'
import {
  ActionIcon,
  Group,
  Space,
  Button,
  Text,
  Center,
  Modal,
  Table,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import birthdayService from '../services/bday'
import { useMutation, useQueryClient } from 'react-query'
import { useNotification } from '../context/NotificationContext'

export default function BirthdayList({ birthdayData }) {
  const [openPopup, setOpenPopup] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const notificationCtx = useNotification()
  // mutation for deleting birthday reminders
  const mutation = useMutation(
    (id) => {
      return birthdayService.removeBirthday(id)
    },
    {
      onError: () => {
        //TODO: add an alert telling the user about the error
        notificationCtx.error('Failed to delete birthday. Please try again.')
      },
      onSuccess: async (data, variables, context) => {
        // refetch the data now that we added something
        await queryClient.invalidateQueries('birthdays')
        notificationCtx.success('Birthday successfuly deleted.')
      },
      onSettled: (data, error, variables, context) => {
        // close the popup and refresh states
        setOpenPopup(false)
        setLoading(false)
      },
    }
  )

  if (birthdayData === null) {
    return (
      <Text align="center" fz="xl">
        Select a month to show that month's birthdays!
      </Text>
    )
  }

  // there are no birthdays on the selected month
  if (birthdayData.length === 0) {
    return (
      <Text align="center" fz="xl">
        No birthdays on this month!
      </Text>
    )
  }

  // key for sorting data by day in ascending order
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
                    onClick={() => {
                      setOpenPopup(true)
                      setIdToDelete(birthdayEntry.id)
                    }}
                  >
                    <IconTrash />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Modal only displayed when openPopup state is set to true */}
        <Modal
          opened={openPopup}
          onClose={() => setOpenPopup(false)}
          title="Are you sure you want to delete this reminder?"
        >
          <Space h="sm" />
          <Group position="right" mr="md">
            <Button color="gray" onClick={() => setOpenPopup(false)}>
              Cancel
            </Button>
            <Button
              variant="filled"
              color="red"
              onClick={() => {
                setLoading(true)
                mutation.mutate(idToDelete)
              }}
              loading={loading}
            >
              Delete
            </Button>
          </Group>
        </Modal>
      </Center>
    </>
  )
}
