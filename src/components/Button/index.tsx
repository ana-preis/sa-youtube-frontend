import React from 'react';
import './styles.css';

export interface ButtonProps {
    text: string
}

const Button = ({text}: ButtonProps) => {
    return (
        <button
            className="button"
            onClick={()=>{console.log('click')}}
        >
            {text}
        </button>
    );
}

export default Button;