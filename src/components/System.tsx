import { useContext, useEffect, useState } from 'react'
import { Home } from './Home'
import { GameContext } from './context/GameContext'
import { Game } from './Game'
import { Signup } from './Signup'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, getUserData, userSignout } from '../firebase'
import { UserContext } from './context/UserContext';
import { FaRegUser } from "react-icons/fa";
import { Button } from './atoms/Button'
// import { LeaderBoard } from './LeaderBoard'
import { notifySuccess } from '../App'



export type UserData = {
    username: string;
    wins: 0;
    loses: 0;
}

export const System = () => {
    const gameData = useContext(GameContext)
    const userData = useContext(UserContext)
    const [authUser, setAuthUser] = useState<User | null>({} as User);
    const [displaySignup, setDisplaySignup] = useState<boolean>(false);
    // const [_, setAllUsersState] = useState<UserData[]>([])
    // getUserData(gameData, userData)
    // getAllUsersStats()
    useEffect(()=>{
        const listen = onAuthStateChanged(auth, (user)=>{
            if(user){
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }
            // // console.log("here")
        })
        return () =>{
            listen();
        }
    },[auth])
    useEffect(() => {
        if (authUser) {
            // Call your function to fetch user data here
            getUserData(gameData, userData);
            // getAllUsersStats().then((data: UserData[])=>{
            //     setAllUsersState(data)
            // })
            // console.log("here")
        }
    }, [authUser]);
  return (
    <div className='w-full min-h-screen flex flex-col pt-10 lg:flex-row gap-10 lg:gap-0 items-center justify-center bg-neutral-900 text-white font-classica relative'>
        {/* {authUser !== null && } */}
        {authUser && <div onMouseEnter={()=>{
            setDisplaySignup(true)
        }} onMouseLeave={()=>{
            setDisplaySignup(false)
        }} className='lg:absolute top-10 left-24 text-xl flex items-center gap-4 cursor-pointer'><FaRegUser /> {userData.user?.username} 
            <div className={`absolute lg:top-10 top-24  left-[50%] -translate-x-[50%] overflow-hidden ${displaySignup?"h-12":"h-0"} transition-all duration-300`}>
                <Button text='LOGOUT' className='text-lg' handleClick={()=>{
                    userSignout()
                    setDisplaySignup(false)
                    notifySuccess("Logged out successfully")
                }}/>
            </div>
        </div>}
        {!authUser ? <Signup/> : gameData.game?.started? <Game/> : <Home/>}
        
        
        
    </div>
  )
}
