import React, { createContext, useState, ReactNode } from 'react'


export const modeContext= createContext({});

export default function UserContext({children}) {
  const [mode, setMode] = useState(null)
  return (
    <>
      <modeContext.Provider value={{mode, setMode}}>
        {children}
      </modeContext.Provider>
    </>
  )
}
