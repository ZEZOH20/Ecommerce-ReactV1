import React, { createContext, useState, ReactNode } from 'react'


export const userContext= createContext({});

export default function UserContext({children}) {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  return (
    <>
      <userContext.Provider value={{token, setToken}}>
        {children}
      </userContext.Provider>
    </>
  )
}
