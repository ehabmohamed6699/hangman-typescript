import { useContext } from 'react'
import { GameContext } from './context/GameContext'
import { updateUser } from '../firebase'


export const Keyboard = () => {
    const gameData = useContext(GameContext)

    const validateLetter = (letter: string) => {
        console.log(gameData.game)
        if(gameData.game?.wrongLetters.length == 6 || gameData.game?.correctLetters.length == gameData.game?.word?.length){
            return
        }
        let idx = gameData.game?.currentWord?.search(letter)
        if(idx === -1){
            if(gameData.game){
                if(gameData.game?.wrongLetters.length == 5){
                    gameData.setGame({...gameData.game, wrongLetters: [...gameData.game?.wrongLetters, letter], loses: gameData.game.loses + 1})
                    updateUser(gameData.game.wins, gameData.game.loses + 1)
                }else{
                    gameData.setGame({...gameData.game, wrongLetters: [...gameData.game?.wrongLetters, letter]})
                }
                
            }
        }else{
            let correctLetter = {index: idx as number, letter: letter}
            let newWord = gameData.game?.currentWord
            if(newWord && typeof idx === "number"){
                newWord = newWord.substring(0, idx) + "*" + newWord.substring(idx+1)
            }
            
            if(gameData.game){
                if(gameData.game?.correctLetters.length == gameData.game?.currentWord?.length as number - 1){
                    gameData.setGame({...gameData.game, correctLetters: [...gameData.game.correctLetters, correctLetter], currentWord: newWord, wins: gameData.game.wins + 1})
                    updateUser(gameData.game.wins + 1, gameData.game.loses)
                }else{
                    gameData.setGame({...gameData.game, correctLetters: [...gameData.game.correctLetters, correctLetter], currentWord: newWord})
                }
                
            }
        }
        
      }
  return (
    <div className='grid grid-cols-8 gap-2 lg:px-0 px-3'>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => {
            const disabled = gameData.game?.wrongLetters.includes(letter)
            return (<button disabled={disabled} onClick={()=>{
                validateLetter(letter)
            }} key={index} className={`lg:p-2 px-2 py-1 border-2 ${disabled && "border-neutral-600 text-neutral-600"} flex items-center justify-center lg:text-2xl text-xl cursor-pointer`}>{letter}</button>)
        })}
    </div>
  )
}
