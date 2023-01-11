import { useState } from 'react'
import { useForm } from '@mantine/form'
import birthdayService from '../services/bday'
import {
  TextInput,
  Button,
  Space,
  Title,
  Text,
  createStyles,
  Center,
  Paper,
  Flex,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { IconCalendar } from '@tabler/icons'
import { useMutation, useQueryClient } from 'react-query'
import { useNotification } from '../context/NotificationContext'

// styles for the calendar displayed for date selection
const useStyles = createStyles((theme) => ({
  weekend: {
    color:
      theme.colorScheme === 'light'
        ? `${theme.colors.gray[7]} !important`
        : `${theme.colors.dark[0]} !important`,
  },
}))

export default function BirthdayFrom() {
  const [formLoading, setFormLoading] = useState(false)
  const isMobile = useMediaQuery('(max-width: 755px)')
  const { classes, cx } = useStyles()
  const queryClient = useQueryClient()
  const notificationCtx = useNotification()
  // mutation for handling creating birthdays
  const mutation = useMutation(
    (birthday) => {
      setFormLoading(true)
      return birthdayService.addBirthday(birthday)
    },
    {
      onError: () => {
        //TODO: add an alert telling the user about the error
        notificationCtx.error('Failed to add birthday. Please try again.')
      },
      onSuccess: async (data, variables, context) => {
        // refetch the data now that we added something
        await queryClient.invalidateQueries('birthdays')
        notificationCtx.success('Successfully added birthday!')
      },
      onSettled: (data, error, variables, context) => {
        // close the popup and refresh states
        form.reset()
        setFormLoading(false)
      },
    }
  )

  // from handling hook for adding birthdays
  const form = useForm({
    initialValues: {
      name: '',
      date: null,
    },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Must enter a name!'),
      date: (value) => (value !== null ? null : 'Must enter a date!'),
    },
    // convert the date from strign with suffix to number
    transformValues: (values) => ({
      name: values.name,
      // seperate date into month and date
      month: values.date.getMonth() + 1,
      day: values.date.getDate(),
    }),
  })

  return (
    <Paper withBorder shadow="lg" p="md" radius="md">
      <Title order={3}>Add a Birthday</Title>
      <Text fz="xs">Get a reminder text for every person's birthday!</Text>
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
        <Flex
          justify="space-around"
          direction={{ base: 'column', sm: 'row' }}
          gap="xs"
        >
          <TextInput
            label="Name"
            placeholder="Person Name"
            size="md"
            {...form.getInputProps('name')}
          />
          <DatePicker
            dropdownType={isMobile ? 'modal' : 'popover'}
            placeholder="Pick date"
            label="Birthday"
            firstDayOfWeek="sunday"
            minDate={dayjs(new Date()).startOf('year').toDate()}
            maxDate={dayjs(new Date()).endOf('year').toDate()}
            dayClassName={(date, modifiers) =>
              cx({
                [classes.weekend]: modifiers.weekend && !modifiers.outside,
              })
            }
            //styles={{ root: { width: '15rem' } }}
            size="md"
            icon={<IconCalendar size={16} />}
            {...form.getInputProps('date')}
          />
        </Flex>
        <Space h="md" />
        <Center>
          <Button size="md" loading={formLoading} type="submit">
            Submit
          </Button>
        </Center>
      </form>
    </Paper>
  )
}
