import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Container,
  Flex,
  Title,
  Space,
  Select,
  LoadingOverlay,
} from '@mantine/core'
import { IconCalendar } from '@tabler/icons'
import BirthdayForm from '../components/BirthdayForm'
import birthdayService from '../services/bday'
import BirthdayList from '../components/BirthdayList'
import { useQuery } from 'react-query'
import monthData from '../config/data'

export default function Home() {
  const navigate = useNavigate()
  const { session, loadingSession } = useAuth()
  const [displayedBirthday, setDisplayedBirthday] = useState(null)
  const [monthChosen, setMonthChosen] = useState(null)
  const { isLoading, isError, data, error } = useQuery(
    'birthdays',
    birthdayService.getBirthdays
  )

  // if user not logged in, send them to login page
  useEffect(() => {
    // checks that sesssion not available, and that session is done being fetched
    if (!session && !loadingSession) {
      navigate('/login')
    }
  }, [session, navigate, loadingSession])

  // change display data when user changes it,
  // or when the data is invalidated (something deleted or updated)
  useEffect(() => {
    async function handleDisplayData() {
      if (monthChosen === null) {
        return
      }
      // convert the month string to corresponding number for month
      const month = monthData.month.indexOf(monthChosen) + 1
      const birthdaysInMointh = data.filter((entry) => entry.month === month)
      setDisplayedBirthday(birthdaysInMointh)
    }

    handleDisplayData()
  }, [monthChosen, data])

  return (
    <>
      <Container>
        <BirthdayForm />
        <Space h="md" />
        <Title order={1} my="xs" align="center">
          Current Birthday Reminders
        </Title>
        <Flex justify="center" align="center" mb="md">
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <Select
            placeholder="Month"
            label="Month"
            searchable
            nothingFound="No options"
            data={monthData.month}
            icon={<IconCalendar size={16} />}
            size="lg"
            value={monthChosen}
            onChange={(value) => setMonthChosen(value)}
          />
        </Flex>
        <BirthdayList birthdayData={displayedBirthday} />
      </Container>
      <Space h="xl" />
    </>
  )
}
