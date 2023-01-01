import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Flex, createStyles, Title, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { IconCalendar } from '@tabler/icons'
import BirthdayForm from '../components/BirthdayForm'
import birthdayService from '../services/bday'
import BirthdayList from '../components/BirthdayList'

// styles for the calendar displayed for date selection
const useStyles = createStyles((theme) => ({
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
  const isMobile = useMediaQuery('(max-width: 755px)')
  const { classes, cx } = useStyles()
  const [birthdayData, setBirthdayData] = useState(null)
  const [fetchingBirthdays, setFetchingBirthdays] = useState(false)

  // if user not logged in, send them to login page
  useEffect(() => {
    // checks that sesssion not available, and that session is done being fetched
    if (!session && !loadingSession) {
      navigate('/login')
    }
  }, [session, navigate, loadingSession])

  async function handleDisplayData(date) {
    if (date === null) {
      return
    }
    setFetchingBirthdays(true)
    // add one since indexed at 0
    const month = date.getMonth() + 1
    const day = date.getDate()

    const res = await birthdayService.getBirthdays(month, day)
    setBirthdayData(res)
    setFetchingBirthdays(false)
  }

  return (
    <>
      <Container>
        <BirthdayForm />
        <Space h="md" />
        <Title order={1} my="xs" align="center">
          Current Birthday Reminders
        </Title>
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
                [classes.weekend]: modifiers.weekend && !modifiers.outside,
              })
            }
            styles={{ root: { width: '15rem' } }}
            icon={<IconCalendar size={16} />}
            onChange={(value) => handleDisplayData(value)}
            mb="sm"
          />
        </Flex>
        <BirthdayList birthdayData={birthdayData} loading={fetchingBirthdays} />
      </Container>
      <Space h="xl" />
    </>
  )
}
