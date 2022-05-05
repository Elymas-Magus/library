import { createContext } from "react";

export type UserData = {
  id: number|string|undefined,
  name: string|undefined,
  email: string|undefined,
}

const initialUserState: UserData = {
  id: undefined,
  name: undefined,
  email: undefined,
};

const initialState = {
  user: initialUserState,
  setUser: (user: UserData) => {},
  authenticated: false,
  setAuthenticated: (auth: boolean) => {}
}

const authContext = createContext(initialState);

export default authContext;