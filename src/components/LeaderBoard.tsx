import { UserData } from './System'
import { GiTrophyCup } from "react-icons/gi";

type LeaderBoardProps = {
    leaderboard: UserData[]
}
export const LeaderBoard = ({leaderboard}:LeaderBoardProps) => {
  return (
    <div className='lg:absolute lg:top-40 lg:left-5 px-8 py-4 gap-4 max-w-96 border-2 min-h-[30rem] flex items-center flex-col'>
        <div className='text-2xl'>LeaderBoard</div>
        {leaderboard.map((item, index) => {
            return(<div key={index} className='lg w-full flex items-center gap-4'>
                {index + 1}- {item.username.length > 15 ? item.username.slice(0,12) + "...": item.username}: Wins: {item.wins}, Loses: {item.loses}
                {index === 0 && <div className='text-yellow-500'><GiTrophyCup /></div>}
                {index === 1 && <div className='text-zinc-400'><GiTrophyCup /></div>}
                {index === 2 && <div className='text-amber-800'><GiTrophyCup /></div>}
            </div>)
        })}
    </div>
  )
}
