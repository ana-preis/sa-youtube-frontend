import React from 'react';
import './styles.css';

export interface ButtonProps {
    text: string,
    className?: string
}

const Button = ({text, className}: ButtonProps) => {
    return (
        <button
            className={`button ${className}`}
            onClick={()=>{console.log('click')}}
        >
            {text}
        </button>
    );
}

export default Button;