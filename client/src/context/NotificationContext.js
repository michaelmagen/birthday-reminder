import { useState, createContext, useContext } from 'react'

// create context for notification
const NotificationContext = createContext({
  notification: null,
  notificationText: null,
  success: () => {},
  error: () => {},
})
// possible states for a notificaiton
const STATES = {
  SUCCESS: 'success',
  ERROR: 'error',
}
// hook wrapper for context
export function useNotification() {
  return useContext(NotificationContext)
}
// create state and util functions for notifications
export function NotificationProvider(props) {
  const [notification, setNotification] = useState(null)
  const [notificationText, setNotificationText] = useState(null)

  const success = (text) => {
    window.scroll(0, 0)
    setNotificationText(text)
    setNotification(STATES.SUCCESS)
    // remove success notification after 10 seconds
    setTimeout(() => {
      clear()
    }, 10000)
  }

  const error = (text) => {
    window.scroll(0, 0)
    setNotificationText(text)
    setNotification(STATES.ERROR)
    // remove error notification after 15 seconds
    setTimeout(() => {
      clear()
    }, 15000)
  }

  const clear = () => {
    setNotificationText(null)
    setNotification(null)
  }

  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        clear,
        notification,
        notificationText,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}
