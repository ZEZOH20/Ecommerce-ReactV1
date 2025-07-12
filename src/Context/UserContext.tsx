import React, { createContext, useState, ReactNode } from "react";

interface State {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const userContext = createContext<State>({
  token: "",
  setToken: () => {}
});

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  
  return (
    <userContext.Provider value={{ token, setToken }}>
      {children}
    </userContext.Provider>
  );
}