import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import {
  TextInput,
  Button,
  Group,
  Box,
  Title,
  Text,
  Select,
  NumberInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'

export default function Home() {
  const navigate = useNavigate()
  const { session, logout } = useAuth()
  const [formLoading, setFormLoading] = useState(false)

  // if user not logged in, send them to login page
  useEffect(() => {
    if (!session) {
      navigate('/login')
    }
  }, [session, navigate])

  // birthday adding form handling hook
  const form = useForm({
    initialValues: {
      name: '',
      month: '',
      day: null,
      birthday: '',
    },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Must Enter a Name!'),
      day: (value) =>
        value > 0 && value < 32 ? null : 'Day must be between 1 and 31.',
    },
  })

  // function that logs out a user and navigate to the login page
  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e)
    }
  }

  // submit the birthday form to the database
  function handleSubmit(values) {
    console.log('the values of the form', values)
    form.reset()
  }

  return (
    <>
      <button onClick={handleLogout}>log out</button>
      <Title>Add a Birthday</Title>
      <Text>
        For every birthday added, we will send you a text reminder about that
        persons birthday!
      </Text>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          mt="sm"
          label="Name"
          placeholder="Person Name"
          {...form.getInputProps('name')}
        />
        <Select
          placeholder="Month"
          label="Birthday Month"
          searchable
          nothingFound="No options"
          data={[
            'January',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          {...form.getInputProps('month')}
        />
        <NumberInput
          placeholder="Day"
          label="Day of Month"
          min={1}
          max={31}
          {...form.getInputProps('day')}
        />
        <DatePicker
          placeholder="Birthday"
          label="Birthday"
          description="When is their birthday this year?"
          allowLevelChange={false}
          firstDayOfWeek="sunday"
          {...form.getInputProps('day')}
        />
        <Button loading={formLoading} type="sumbit">
          Submit
        </Button>
      </form>
    </>
  )
}
