import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import birthdayService from '../services/bday'
import {
  TextInput,
  Button,
  Group,
  Title,
  Text,
  Select,
  Stack,
} from '@mantine/core'

export default function Home() {
  const navigate = useNavigate()
  const { session, loadingSession } = useAuth()
  const [formLoading, setFormLoading] = useState(false)

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
      name: (value) => (value.length > 0 ? null : 'Must enter a mame!'),
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

  // // function that logs out a user and navigate to the login page
  // async function handleLogout() {
  //   try {
  //     await logout()
  //     navigate('/login')
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // submit the birthday form to the database
  function handleSubmit(values) {
    console.log('the values of the form', values)
    const res = birthdayService.addBirthday(values)
    console.log(res)
    form.reset()
  }

  // data for day form select
  const dayData = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
    '13th',
    '14th',
    '15th',
    '16th',
    '17th',
    '18th',
    '19th',
    '20th',
    '21st',
    '22nd',
    '23rd',
    '24th',
    '25th',
    '26th',
    '27th',
    '28th',
    '29th',
    '30th',
    '31st',
  ]

  return (
    <>
      {/* <button onClick={handleLogout}>log out</button> */}
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
        <Stack align="center" spacing="xs">
          <Text fz="xl">Birthday</Text>
          <Group>
            <Select
              placeholder="Month"
              label="Month"
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
            <Select
              placeholder="Day"
              label="Day"
              searchable
              nothingFound="No Options"
              data={dayData}
              {...form.getInputProps('day')}
            />
          </Group>
        </Stack>
        <Button loading={formLoading} type="sumbit">
          Submit
        </Button>
      </form>
    </>
  )
}
