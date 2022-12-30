import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Flex, createStyles } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { IconCalendar } from '@tabler/icons'
import BirthdayFrom from '../components/BirthdayForm'
import birthdayService from '../services/bday'

// styles for the calendar displayed for date selection
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
  const isMobile = useMediaQuery('(max-width: 755px)')
  const { classes, cx } = useStyles()
  const [birthdayData, setBirthdayData] = useState()

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
    // add one since indexed at 0
    const month = date.getMonth() + 1
    const day = date.getDate()

    const res = await birthdayService.getBirthdays(month, day)
    setBirthdayData(res)
    console.log(res)
  }

  return (
    <>
      <Container>
        <BirthdayFrom />
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
            onChange={(value) => handleDisplayData(value)}
          />
        </Flex>
      </Container>
    </>
  )
}
