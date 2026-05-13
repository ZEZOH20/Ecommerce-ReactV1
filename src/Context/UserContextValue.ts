import { createContext } from "react";

interface UserContextState {
  token: string;
  setToken: (token: string) => void;
}

export const UserContext = createContext<UserContextState>({
  token: "",
  setToken: () => {},
});
