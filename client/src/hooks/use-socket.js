import { createContext, useContext, useState } from 'react'
import io from 'socket.io-client'

const SocketStateContext = createContext({
  getSocket: () => {}
})

export const SocketStateProvider = ({ children }) => {
  const SOCKET_CONN = io.connect('http://localhost:4000')

  return (
    <SocketStateContext.Provider
      value={{
        SOCKET_CONN
      }}
    >
      {children}
    </SocketStateContext.Provider>
  )
}

export default () => useContext(SocketStateContext)
