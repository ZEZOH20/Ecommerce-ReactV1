import React, { createContext, useState, ReactNode } from 'react'


interface state{
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
export const userContext= createContext<state>({'fff',()=>{console.log("Hello")}} );

export default function UserContext({children } : {children: ReactNode}) {
  const [token , setToken] = useState(localStorage.getItem("token") || '')
  return (
    <>
      <userContext.Provider value={{token, setToken}}>
        {children}
      </userContext.Provider>
    </>
  )
}
