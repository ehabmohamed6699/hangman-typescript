import { useContext } from 'react'
import { Button } from './atoms/Button'
import { RiArrowLeftSLine } from "react-icons/ri";
import { GameContext } from './context/GameContext';
import { Gameplay } from './Gameplay';
import { updateUser } from '../firebase';


export const Game = () => {
    const gameData = useContext(GameContext)


  return (
    <div className='flex flex-col items-center gap-8 w-full min-h-screen'>
        <Button text='BACK' icon={RiArrowLeftSLine} handleClick={()=>{
            if(gameData.game){
                let newLoses = gameData.game.loses
                if(!(gameData.game.correctLetters.length == gameData.game.currentWord?.length) && !(gameData.game.wrongLetters.length === 6)){
                    newLoses += 1;
                }
                gameData.setGame({started:false, wins:gameData.game.wins, loses: newLoses, wrongLetters: [], correctLetters: []})
                updateUser(gameData.game.wins, newLoses)
                // getUserData(gameData, userData)
            }else{
                gameData.setGame({started:false, wins:0, loses: 0, wrongLetters: [], correctLetters: []})
            }
            
        }} className='lg:absolute lg:top-10 lg:left-72 flex-row-reverse px-5 mt-12 lg:mt-0 text-xl'/>
        
        <Gameplay/>
    </div>
  )
}
