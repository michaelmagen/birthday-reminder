import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import birthdayService from '../services/bday'
import {
  TextInput,
  Button,
  Space,
  Title,
  Text,
  Select,
  Center,
  Paper,
  Container,
  Flex,
  createStyles,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { IconCalendar } from '@tabler/icons'
import data from '../config/data'

const useStyles = createStyles((theme) => ({
  outside: {
    opacity: 0,
  },

  weekend: {
    color:
      theme.colorScheme === 'light'
        ? `${theme.colors.gray[7]} !important`
        : `${theme.colors.dark[0]} !important`,
  },
}))

export default function Home() {
  const navigate = useNavigate()
  const { session, loadingSession } = useAuth()
  const [formLoading, setFormLoading] = useState(false)
  const [displayDate, setDisplayDate] = useState(new Date())
  console.log(displayDate)
  const isMobile = useMediaQuery('(max-width: 755px)')
  const { classes, cx } = useStyles()

  // if user not logged in, send them to login page
  useEffect(() => {
    // checks that sesssion not available, and that session is done being fetched
    if (!session && !loadingSession) {
      navigate('/login')
    }
  }, [session, navigate, loadingSession])

  // birthday adding form handling hook
  const form = useForm({
    initialValues: {
      name: '',
      month: '',
      day: '',
    },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Must enter a name!'),
      month: (value) => (value.length > 0 ? null : 'Must pick a month'),
      day: (value) => (value.length > 0 ? null : 'Must pick a day'),
    },
    // convert the date from strign with suffix to number
    transformValues: (values) => ({
      name: values.name,
      // transform month string to number (jan -> 1)
      month: new Date(values.month + '-1-01').getMonth() + 1,
      // convert day to int and remove suffix
      day: parseInt(values.day.match(/\d/g).join('')),
    }),
  })

  // submit the birthday form to the database
  function handleSubmit(values) {
    setFormLoading(true)
    console.log('the values of the form', values)
    const res = birthdayService.addBirthday(values)
    console.log(res)
    form.reset()
    setFormLoading(false)
  }

  return (
    <>
      <Container>
        <Paper withBorder shadow="lg" p="md" radius="md">
          <Title order={3}>Add a Birthday</Title>
          <Text fz="xs">Get a reminder text for every person's birthday!</Text>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Flex
              justify="space-around"
              direction={{ base: 'column', sm: 'row' }}
              gap="xs"
            >
              <TextInput
                label="Name"
                placeholder="Person Name"
                {...form.getInputProps('name')}
              />
              <Select
                placeholder="Month"
                label="Month"
                searchable
                nothingFound="No options"
                data={data.month}
                {...form.getInputProps('month')}
              />
              <Select
                placeholder="Day"
                label="Day"
                searchable
                nothingFound="No Options"
                data={data.day}
                {...form.getInputProps('day')}
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
        <Flex justify="center" align="center">
          <DatePicker
            dropdownType={isMobile ? 'modal' : 'popover'}
            placeholder="Pick date"
            label="Select date"
            firstDayOfWeek="sunday"
            minDate={dayjs(new Date()).startOf('year').toDate()}
            maxDate={dayjs(new Date()).endOf('year').toDate()}
            dayClassName={(date, modifiers) =>
              cx({
                [classes.outside]: modifiers.outside,
                [classes.weekend]: modifiers.weekend,
              })
            }
            styles={{ root: { width: '15rem' } }}
            icon={<IconCalendar size={16} />}
            value={displayDate}
            onChange={setDisplayDate}
          />
        </Flex>
      </Container>
    </>
  )
}
