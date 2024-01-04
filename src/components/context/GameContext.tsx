import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type GameData = {
    started?: boolean
    wins: number
    loses: number
    wrongLetters: string[]
    currentWord?: string
    correctLetters:{
        index: number
        letter: string
    }[]
    word?: string
} 

export type GameContextType = {
    game: GameData | null
    setGame: Dispatch<SetStateAction<GameData | null>>
}

export const GameContext = createContext({} as GameContextType)

type GameContextProviderProps = {
    children: ReactNode
}

export const GameContextProvider = ({children}: GameContextProviderProps) => {
    const [game, setGame] = useState<GameData | null>(null)
  return (
    <GameContext.Provider value={{game, setGame}}>{children}</GameContext.Provider>
  )
}


