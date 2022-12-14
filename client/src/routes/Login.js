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

export default function Login() {
  const navigate = useNavigate()
  const { session, login } = useAuth()
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
    },
    validate: {
      email: (value) => (value.length > 0 ? null : 'Please enter an email'),
      password: (value) =>
        value.length > 0 ? null : 'Please enter a password',
    },
  })

  // submit form and login with supabase auth
  async function handleSubmit(values) {
    try {
      setLoading(true)
      const error = await login(values.email, values.password)
      // if successful, navigate to home, otherwise throw error
      if (error) {
        console.log('can not login')
      } else {
        navigate('/home')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box sx={{ maxWidth: 350 }} mx="auto">
        <Title align="center"> Login with Account </Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            mt="sm"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            mt="sm"
            placeholder="Password"
            label="Password"
            description="Password must be at least 7 characters"
            withAsterisk
            {...form.getInputProps('password')}
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
          Don't have an account yet? <br></br>
          <Link to={'/register'}>Create an account here.</Link>
        </Text>
      </Box>
    </>
  )
}
