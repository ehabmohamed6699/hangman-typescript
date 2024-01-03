import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type UserData = {
    username: string
} 

export type UserContextType = {
    user: UserData | null
    setUser: Dispatch<SetStateAction<UserData | null>>
}

export const UserContext = createContext({} as UserContextType)

type UserContextProviderProps = {
    children: ReactNode
}

export const UserContextProvider = ({children}: UserContextProviderProps) => {
    const [user, setUser] = useState<UserData | null>(null)
  return (
    <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
  )
}


