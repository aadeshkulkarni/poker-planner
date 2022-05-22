import { createContext, useContext, useState } from 'react'

const AppStateContext = createContext({
  getCurrentUser: () => {},
  setCurrentUser: () => {}
})

export const AppStateProvider = ({ children }) => {
  const [user, setUser] = useState()
  const setCurrentUser = async data => {
    setUser(data)
  }
  // eslint-disable-next-line no-unused-vars
  const getCurrentUser = data => user

  return (
    <AppStateContext.Provider
      value={{
        getCurrentUser,
        setCurrentUser
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export default () => useContext(AppStateContext)
