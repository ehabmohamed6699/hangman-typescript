import { useContext, useState } from 'react'
import { Button } from './atoms/Button'
import { Login } from './Login'
import { signupWithUserData } from './firebase/signup';
import { GameContext } from './context/GameContext';
import { UserContext } from './context/UserContext';
import { notifyError } from '../App';
export type SignupData = {
    username:string;
    email: string;
    password: string;
    passwordConfirmation: string;
}
export const Signup = () => {
    const [signup, setSignup] = useState<boolean>(false)
    const [signupData, setSignupData] = useState<SignupData>({} as SignupData);
    const gameData = useContext(GameContext)
    const userData = useContext(UserContext)
  return (
    <>
    {signup ? <form className='flex flex-col gap-8 w-[30rem] items-center'>
        <div className='text-5xl'>SIGNUP</div>
        <div className='flex flex-col w-full gap-4 items-center'>
            <div className='w-full'>
                <label htmlFor="signup-name">Username</label>
            </div>
            <input id='signup-name' onChange={(e)=>{
                setSignupData({...signupData, username: e.target.value})
            }} type="text" placeholder="username" className="input input-bordered w-full bg-neutral-700 px-5 py-2 font-sans placeholder:font-classica" />
            <div className='w-full'>
                <label htmlFor="signup-mail">Email</label>
            </div>
            <input id='signup-mail' onChange={(e)=>{
                setSignupData({...signupData, email: e.target.value})
            }} type="email" placeholder="email" className="input input-bordered w-full bg-neutral-700 px-5 py-2 font-sans placeholder:font-classica" />
            <div className='w-full'>
                <label htmlFor="signup-pass">Password</label>
            </div>
            <input id='signup-pass' onChange={(e)=>{
                setSignupData({...signupData, password: e.target.value})
            }} type="password" placeholder="password" className="input input-bordered w-full bg-neutral-700 px-5 py-2 font-sans placeholder:font-classica" />
            <div className='w-full'>
                <label htmlFor="signup-pass-conf">Confirm Password</label>
            </div>
            <input id='signup-pass-conf' onChange={(e)=>{
                setSignupData({...signupData, passwordConfirmation: e.target.value})
            }} type="password" placeholder="confirm password" className="input input-bordered w-full bg-neutral-700 px-5 py-2 font-sans placeholder:font-classica" />
        </div>
        <Button text='SIGNUP' handleClick={(e)=>{
            e.preventDefault()
            if(signupData.password !== signupData.passwordConfirmation){
                notifyError("Password and password confirmation must be the same")
            }else{
                signupWithUserData(signupData, gameData, userData)
            }
        }} className='text-xl'/>
        <div>Already have an account? <span className='underline cursor-pointer' onClick={()=>{
            setSignup(false)
        }}>Login</span></div>
    </form> : <Login setSignup={setSignup}/>}
    </>
  )
}
