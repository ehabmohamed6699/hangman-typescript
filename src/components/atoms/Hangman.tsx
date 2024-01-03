type HangmanProps = {
    stage: number;
}

export const Hangman = ({stage}:HangmanProps) => {
  return (
    <div className='flex flex-col items-center relative pb-9'>
        {stage > 0 && <div className={`w-16 h-16 border-2 rounded-full bg-neutral-900`}></div>}
        {stage > 1 && <div className='w-0.5 h-16 bg-white'></div>}
        {stage > 2 && <div className='w-0.5 h-12 bg-white absolute top-14 left-3.5 rotate-45'></div>}
        {stage > 3 && <div className='w-0.5 h-12 bg-white absolute top-14 right-3.5 -rotate-45'></div>}
        {stage > 4 && <div className='w-0.5 h-12 bg-white absolute top-30 left-3.5 rotate-45'></div>}
        {stage > 5 && <div className='w-0.5 h-12 bg-white absolute top-30 right-3.5 -rotate-45'></div>}
    </div>
  )
}
