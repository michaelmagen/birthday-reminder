import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from '@mantine/form'
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Title,
  Text,
} from '@mantine/core'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { session, register } = useAuth()
  const [loading, setLoading] = useState(false)

  // send user to home page when logged in
  useEffect(() => {
    if (session) {
      navigate('/home')
    }
  }, [session, navigate])

  // form handling hook
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      number: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 6 ? null : 'Invalid Password'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
      name: (value) => (value.length > 2 ? null : 'Invalid Name'),
      number: (value) =>
        value.replace(/\D/g, '').length === 10
          ? null
          : 'Must enter a valid phone number',
    },
  })

  // submit form and register account
  async function handleSubmit(values) {
    try {
      setLoading(true)
      const { data, error } = await register(
        values.email,
        values.password,
        values.number,
        values.name
      )
      if (error) {
        console.log(error)
      } else {
        navigate('/home')
      }
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  return (
    <>
      <Box sx={{ maxWidth: 350 }} mx="auto">
        <Title align="center"> Create an Account</Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            mt="sm"
            withAsterisk
            label="Name"
            placeholder="Your Name"
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="sm"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            mt="sm"
            withAsterisk
            label="Phone Number"
            placeholder="xxx-xxx-xxxx"
            {...form.getInputProps('number')}
          />
          <PasswordInput
            mt="sm"
            placeholder="Password"
            label="Password"
            description="Password must be at least 7 characters"
            withAsterisk
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mt="sm"
            placeholder="Password"
            label="Confirm Password"
            withAsterisk
            {...form.getInputProps('confirmPassword')}
          />
          <Group position="right" mt="md">
            <Button variant="outline" color="gray" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button loading={loading} type="sumbit">
              Submit
            </Button>
          </Group>
        </form>
        <Text ta="center" mt="md">
          Already have an account?<br></br>
          <Link to={'/login'}>Log in here!</Link>
        </Text>
      </Box>
    </>
  )
}
