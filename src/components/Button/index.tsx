import React from 'react';
import './styles.css';

export interface ButtonProps {
    text: string,
    onClick?: () => {};
    className?: string
}

const Button = ({text, className, onClick}: ButtonProps) => {
    return (
        <button
            className={`button ${className}`}
            onClick={()=>{onClick}}
        >
            {text}
        </button>
    );
}

export default Button;