import React from 'react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import './styles.css';

const Header = () => {
	const location = useLocation();

	return (
		<div className="header-container">
			<Link to="/home" className="link_header">
				<a className="logo-container">
						<img src="./log2.svg" alt="logo" className="logo-image"></img>
						<div className="logo-text">ComuniTube</div>
				</a>
			</Link>
			{location.pathname !== "/login" && 
			<Link to="/login">
				<Button className="login-button" text="Login"/>
			</Link>
			}
		</div>
	)  
}

export default Header;