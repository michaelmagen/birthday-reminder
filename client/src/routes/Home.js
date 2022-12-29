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
} from '@mantine/core'
import data from '../config/data'

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
      </Container>
    </>
  )
}
