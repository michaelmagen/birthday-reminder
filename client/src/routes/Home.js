import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Container,
  Flex,
  createStyles,
  Title,
  Space,
  Select,
  LoadingOverlay,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { IconCalendar } from '@tabler/icons'
import BirthdayForm from '../components/BirthdayForm'
import birthdayService from '../services/bday'
import BirthdayList from '../components/BirthdayList'
import { useQuery } from 'react-query'
import monthData from '../config/data'

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
          {/* <DatePicker
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
          /> */}
          <Select
            placeholder="Month"
            label="Month"
            searchable
            nothingFound="No options"
            data={monthData.month}
            icon={<IconCalendar size={16} />}
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
