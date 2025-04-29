import React, { createContext, useState, ReactNode } from 'react'

interface inter{
  children: ReactNode;
}
interface state{
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const userContext= createContext({});

export default function UserContext({children} : inter) {
  const [token , setToken] = useState(localStorage.getItem("token") || null)
  return (
    <>
      <userContext.Provider value={{token, setToken}}>
        {children}
      </userContext.Provider>
    </>
  )
}
