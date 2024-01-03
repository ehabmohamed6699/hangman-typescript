import { UserData } from './System'
type LeaderBoardProps = {
    leaderboard: UserData[]
}
export const LeaderBoard = ({leaderboard}:LeaderBoardProps) => {
  return (
    <div className='absolute top-40 left-5 px-8 py-4 gap-4 w-96 border-2 min-h-[36rem] flex items-center flex-col'>
        <div className='text-2xl'>LeaderBoard</div>
        {leaderboard.sort((x, y) => {
            if (y.wins !== x.wins) {
                return y.wins - x.wins;
            } else {
                return x.loses - y.loses;
            }
        }).slice(0,10).map((item, index) => {
            return(<div key={index} className='lg w-full flex'>{index + 1}- {item.username.length > 15 ? item.username.slice(0,12) + "...": item.username}: Wins: {item.wins}, Loses: {item.loses}</div>)
        })}
    </div>
  )
}
