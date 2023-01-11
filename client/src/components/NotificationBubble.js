import { Alert } from '@mantine/core'
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons'
import { useNotification } from '../context/NotificationContext'

export default function NotificationBubble() {
  const { notification, notificationText, clear } = useNotification()
  return (
    notification !== null && (
      <Alert
        icon={
          notification === 'error' ? (
            <IconAlertCircle size={16} />
          ) : (
            <IconCircleCheck size={16} />
          )
        }
        title={notification === 'error' ? 'Error!' : 'Success!'}
        color={notification === 'error' ? 'red' : 'green'}
        radius="md"
        withCloseButton
        variant="filled"
        w={500}
        onClose={() => clear()}
        ml="md"
        sx={{
          position: 'fixed',
          zIndex: 100,
          '@media (max-width: 755px)': {
            right: 0,
            left: 0,
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '80%',
          },
        }}
      >
        {notificationText}
      </Alert>
    )
  )
}
