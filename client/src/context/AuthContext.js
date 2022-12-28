// Create auth context for supabase auth

import { createContext, useContext, useState, useEffect } from 'react'

import { supabase } from '../config/supabase-config'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState()
  const [loadingSession, setLoadingSession] = useState(true)

  async function register(email, password, phone, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: fullName,
          phone: phone,
        },
      },
    })
    console.log({ data, error })
    return { data, error }
  }

  async function login(email, password) {
    const { data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    // if the data returned is null, error while loggin in
    const error = data.user === null
    return error
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    return error
  }

  // retrieve session and update session validity
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoadingSession(false)
    })

    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session)
    // })

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        // delete cookies on sign out
        const expires = new Date(0).toUTCString()
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
        document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
        document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
      }

      setSession(session)
    })
  }, [])

  const value = {
    session,
    loadingSession,
    login,
    register,
    logout,
  }
  // had !loading in brackets not sure why might be needed idk
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
