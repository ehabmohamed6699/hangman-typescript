import { useContext } from 'react';
import { Hangman } from './atoms/Hangman'
import { RiArrowRightSLine } from "react-icons/ri";
import { GameContext, GameContextType } from './context/GameContext';
import { Button } from './atoms/Button';
import words from '../wordList.json';
import { FaLinkedin, FaGithub, FaFacebook} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const newGame = (gameData: GameContextType)=>{
  const randWord = words[Math.floor(Math.random() * words.length)].toUpperCase()
  if(gameData.game){
      gameData.setGame({started:true, wins:gameData.game.wins, loses: gameData.game.loses, wrongLetters: [], correctLetters: [], currentWord: randWord, word: randWord})
  }else{
      gameData.setGame({started:true, wins:0, loses: 0, wrongLetters: [], correctLetters: [], currentWord: randWord, word: randWord})
  }
}

export const Home = () => {
  const gameData = useContext(GameContext)
  
  return (
    <div className='flex flex-col items-center gap-8'>
        <div className='text-5xl'>Hangman Game<span className='text-xl text-red-600'>v1.0.1</span></div>
        <Hangman stage={6}/>
        <Button text='START' icon={RiArrowRightSLine} handleClick={()=>{
          newGame(gameData)
        }}/>
        <div className='absolute bottom-32'>Made by Eng. Ehab Mohammed</div>
        <div className='absolute bottom-24'>Find more work on my <a className='underline' href='https://master--transcendent-lollipop-ee6189.netlify.app/'>Portfolio</a></div>
        <div className='absolute bottom-16 flex gap-3 items-center'>Follow me on 
            <div className='flex items-center gap-3 text-xl'>
                <a href='https://www.linkedin.com/in/ehab-mohamed-8286241b8/'><FaLinkedin /></a>
                <a href='https://github.com/ehabmohamed6699'><FaGithub /></a>
                <a href='https://www.facebook.com/profile.php?id=100037787358784'><FaFacebook/></a>
                <a href='https://twitter.com/EhabMoh6699'><FaXTwitter /></a>
            </div>
        </div>
    </div>
  )
}
