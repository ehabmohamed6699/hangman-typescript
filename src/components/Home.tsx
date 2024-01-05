import { useContext, useEffect, useState } from 'react';
import { Hangman } from './atoms/Hangman'
import { RiArrowRightSLine } from "react-icons/ri";
import { GameContext, GameContextType } from './context/GameContext';
import { Button } from './atoms/Button';
import words from '../wordList.json';
import { FaLinkedin, FaGithub, FaFacebook} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LeaderBoard } from './LeaderBoard';
import { User } from 'firebase/auth';
import { UserData } from './System';
import { getAllUsersStats } from '../firebase';

export const newGame = (gameData: GameContextType)=>{
  const randWord = words[Math.floor(Math.random() * words.length)].toUpperCase()
  // const randWord = "HERE"
  if(gameData.game){
      gameData.setGame({started:true, wins:gameData.game.wins, loses: gameData.game.loses, wrongLetters: [], correctLetters: [], currentWord: randWord, word: randWord})
  }else{
      gameData.setGame({started:true, wins:0, loses: 0, wrongLetters: [], correctLetters: [], currentWord: randWord, word: randWord})
  }
}

export const  Home = () => {
  const gameData = useContext(GameContext)
  const [authUser, _] = useState<User | null>({} as User);
  const [allUsersState, setAllUsersState] = useState<UserData[]>([])
  useEffect(() => {
    if (authUser) {
        // Call your function to fetch user data here
        // getUserData(gameData, userData);
        getAllUsersStats().then((data: UserData[])=>{
            setAllUsersState(data)
        })
        // console.log("here")
    }
}, [authUser]);
  return (
    <div className='flex flex-col items-center gap-8 pt-10 pb-10 lg:pb-0'>
        <div className='lg:text-5xl text-3xl'>Hangman Game<span className='lg:text-xl text-base text-red-600'>v1.0.3</span></div>
        <Hangman stage={6}/>
        <Button text='START' icon={RiArrowRightSLine} handleClick={()=>{
          newGame(gameData)
        }}/>
        <div className='lg:absolute relative lg:top-10 lg:right-24 text-xl'>
            <div>Your score</div>
            <div>Wins: {gameData.game?.wins || 0}</div>
            <div>Loses: {gameData.game?.loses || 0}</div>
        </div>
        <LeaderBoard leaderboard={allUsersState}/>
        <div className='lg:absolute lg:bottom-32 text-center flex flex-col gap-4'>
          <div className=''>Made by Eng. Ehab Mohammed</div>
          <div className=''>Find more work on my <a className='underline' href='https://master--transcendent-lollipop-ee6189.netlify.app/'>Portfolio</a></div>
          <div className='flex gap-3 items-center justify-center'>Follow me on 
              <div className='flex items-center gap-3 text-xl'>
                  <a href='https://www.linkedin.com/in/ehab-mohamed-8286241b8/'><FaLinkedin /></a>
                  <a href='https://github.com/ehabmohamed6699'><FaGithub /></a>
                  <a href='https://www.facebook.com/profile.php?id=100037787358784'><FaFacebook/></a>
                  <a href='https://twitter.com/EhabMoh6699'><FaXTwitter /></a>
              </div>
          </div>
        </div>
    </div>
  )
}
