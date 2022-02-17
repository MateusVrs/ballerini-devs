import { ButtonHTMLAttributes } from 'react'

import '../styles/components/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
}

export function Button({className = '', ...props}: ButtonProps) {

    return (
        <button {...props} className={`button ${className}`} />
    )
}