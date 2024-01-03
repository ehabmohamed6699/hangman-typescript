import React from 'react'
import { IconType } from 'react-icons';
type ButtonProps = {
    text: string;
    icon?: IconType;
    className?: React.ComponentProps<'div'>['className'];
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({text, icon: Icon, className, handleClick}: ButtonProps) => {
  return (
    <button onClick={handleClick} className={`${className} flex items-center text-3xl px-10 py-2 rounded-3xl border-2 text-center gap-2 hover:bg-white hover:text-neutral-900 transition-all duration-300`}>
          <div>{text}</div>
          {Icon && <Icon />}
      </button>
  )
}
