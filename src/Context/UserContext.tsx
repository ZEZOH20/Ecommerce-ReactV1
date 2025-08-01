import { createContext, useState, ReactNode } from "react";

interface State {
  token: string;
  setToken: (token : string) => void;
}

export const UserContext = createContext<State>({
  token: "",
  setToken: () => {},
});

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
