import { useContext} from 'react'
import { Hangman } from './atoms/Hangman'
import { GameContext } from './context/GameContext'
import { Keyboard } from './Keyboard'
import { Button } from './atoms/Button'
import { MdOutlineReplay } from "react-icons/md";
import { newGame } from './Home'

export const Gameplay = () => {
  const gameData = useContext(GameContext)
  
  return (
    <div className='flex flex-col gap-5 items-center w-full'>
        <div className='w-48 h-72 border-b-4 flex items-center justify-center  relative'>
            <div className='h-full w-full border-r-4 '></div>
            <div className='h-full w-full border-t-4'>
                <div className='h-16 w-full border-r-4'></div>
            </div>
            <div className='absolute top-[4.1rem] -right-8'>
                <Hangman stage={gameData.game?.wrongLetters? gameData.game?.wrongLetters.length: 0}/>
            </div>
        </div>
        <div>
            <div className='w-full flex gap-2 min-h-14'>{Array(gameData.game?.currentWord?.length).fill(0).map((_, index) => {
                let curLetter = gameData.game?.correctLetters.find(x => x.index === index)
                let gameOver = gameData.game?.wrongLetters.length === 6
                return(<div className='flex flex-col items-center justify-end'>
                    {curLetter && <span className={`text-5xl`}>{curLetter?.letter}</span>}
                    {gameOver && !curLetter && <span className={`text-5xl text-red-600`}>{gameData.game?.currentWord?.[index]}</span>}
                    <div key={index} className='w-10 h-1 bg-white'></div> 
                </div>)
            })}</div>
        </div>
        <Keyboard/>
        <div className='min-h-14'>
            {gameData.game?.correctLetters.length == gameData.game?.currentWord?.length && <Button text='NEW GAME' handleClick={()=>{
                newGame(gameData)
            }}/>}
            {gameData.game?.wrongLetters.length == 6 && <Button text='TRY AGAIN' icon={MdOutlineReplay} handleClick={()=>{
                newGame(gameData)
            }}/>}
        </div>
    </div>
  )
}
