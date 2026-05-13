import { useState, ReactNode } from "react";
import { UserContext } from "./UserContextValue";

function getStoredToken() {
  const storedToken = localStorage.getItem("token") || "";

  try {
    const parsedToken = JSON.parse(storedToken);

    if (typeof parsedToken === "string") {
      localStorage.setItem("token", parsedToken);
      return parsedToken;
    }
  } catch {
    return storedToken;
  }

  return storedToken;
}

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState(getStoredToken);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
