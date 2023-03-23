import React from 'react';
import Button from '../Button';
import './styles.css';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-container">
                <img src="./log2.svg" alt="logo" className="logo-image"></img>
                <div className="logo-text">ComuniTube</div>
            </div>
            <Button text="Login" />
        </div>
    )
}

export default Header;