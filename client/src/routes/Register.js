import { useForm } from '@mantine/form'
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Title,
} from '@mantine/core'

export default function Register() {
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
      number: (value) => (value !== null ? null : 'Must Enter Phone Number'),
    },
  })
  return (
    <>
      <Box sx={{ maxWidth: 350 }} mx="auto">
        <Title align="center"> Create an Account</Title>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            <Button type="sumbit">Submit</Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
