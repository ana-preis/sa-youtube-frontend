import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { useLocation, Link, useNavigate } from 'react-router-dom'

import './styles.css';
import { UserType } from '../../types/User';
import { MockUser } from '../../mocks/MockUser';

const Header = () => {
  const [userLogged, setUserLogged] = useState<boolean>(true)
  const [user, setUser] = useState<UserType>()
	const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // check if user is logged in
    //setUserLogged(true)
  },[])

  const handleLogout = () => {
    // logout
    navigate("/")
  }

	return (
		<div className="header-container">
			<Link to="/" className="link_header">
				<a className="logo-container">
						<img src="./log2.svg" alt="logo" className="logo-image"></img>
						<div className="logo-text">ComuniTube</div>
				</a>
			</Link>
      {userLogged
        &&
        <>
          <Link to={`/users/1`}>
            <Button  className="login-button" text={MockUser.username} />
          </Link>
          <Button className="login-button" text="Sair" onClick={handleLogout}/>
        </>
      }
			{location.pathname !== "/login" && 
        <Link to="/login">
          <Button className="login-button" text="Login"/>
        </Link>
			}
		</div>
	)  
}

export default Header;