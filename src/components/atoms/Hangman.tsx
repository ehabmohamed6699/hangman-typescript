type HangmanProps = {
    stage: number;
}

export const Hangman = ({stage}:HangmanProps) => {
  return (
    <div className='flex flex-col items-center relative pb-9'>
        {stage > 0 && <div className={`w-12 h-12 border-2 rounded-full bg-neutral-900`}></div>}
        {stage > 1 && <div className='w-0.5 h-12 bg-white'></div>}
        {stage > 2 && <div className='w-0.5 h-10 bg-white absolute top-[2.6rem] left-[0.6rem] rotate-45'></div>}
        {stage > 3 && <div className='w-0.5 h-10 bg-white absolute top-[2.6rem] right-[0.6rem] -rotate-45'></div>}
        {stage > 4 && <div className='w-0.5 h-10 bg-white absolute top-[5.5rem] left-[0.6rem] rotate-45'></div>}
        {stage > 5 && <div className='w-0.5 h-10 bg-white absolute top-[5.5rem] right-[0.6rem] -rotate-45'></div>}
    </div>
  )
}
