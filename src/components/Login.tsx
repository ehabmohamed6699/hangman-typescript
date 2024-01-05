import { useState } from 'react';
import { Button } from './atoms/Button'
import { loginWithUserData } from './firebase/login';
type LoginProps = {
    setSignup: (newState: boolean)=>void
}

export type LoginData = {
    email: string;
    password: string;
}
export const Login = ({setSignup}: LoginProps) => {
    const [loginData, setLoginData] = useState<LoginData>({} as LoginData)
  return (
    <form className='flex flex-col gap-8 w-full px-3 lg:w-[30rem] items-center'>
        <div className='text-5xl'>LOGIN</div>
        <div className='flex flex-col w-full gap-4 items-center'>
            <div className='w-full'>
                <label htmlFor="signup-mail">Email</label>
            </div>
            <input id='signup-mail' onChange={(e)=>{
                setLoginData({...loginData, email:e.target.value})
            }} type="text" placeholder="email" className="input input-bordered w-full bg-neutral-700 px-5 py-2 font-sans placeholder:font-classica" />
            <div className='w-full'>
                <label htmlFor="signup-pass">Password</label>
            </div>
            <input id='signup-pass' onChange={(e)=>{
                setLoginData({...loginData, password:e.target.value})
            }} type="password" placeholder="password" className="input input-bordered w-full bg-neutral-700 px-5 py-2 font-sans placeholder:font-classica" />
        </div>
        <Button text='LOGIN' handleClick={(e)=>{
            e.preventDefault();
            loginWithUserData(loginData);
        }} className='text-xl'/>
        <div>New to the game? <span className='underline cursor-pointer' onClick={()=>{
            setSignup(true)
        }}>Signup</span></div>
    </form>
  )
}
