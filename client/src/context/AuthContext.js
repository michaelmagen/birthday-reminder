// Create auth context for supabase auth

import { createContext, useContext, useState, useEffect } from 'react'

import { supabase } from '../config/supabase-config'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState()

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
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const value = {
    session,
    login,
    register,
    logout,
  }
  // had !loading in brackets not sure why might be needed idk
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
