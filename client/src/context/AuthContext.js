// Create auth context for supabase auth

import { createContext, useContext, useState, useEffect } from 'react'

import { supabase } from '../config/supabase-config'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState()
  //const [loading, setLoading] = useState(true)

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

  function login(email, password) {
    //return signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
  }

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
