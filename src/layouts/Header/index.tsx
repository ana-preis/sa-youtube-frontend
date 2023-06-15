import Button from '../../components/Button';
import { useLocation, Link, useNavigate, useOutletContext } from 'react-router-dom'
import { ContextType, useUser } from "../PageBase";
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { UserType } from '../../types/User';
import { waitFor } from '@testing-library/react';
import { UserContext } from '../PageBase';

const Header = () => {

  const context = useContext(UserContext);
  const { 
    userContext
  } = context || {};
  const [isAuth, setIsAuth] = useState<boolean>()
  const [user, setUser] = useState(userContext[0] ?? null)


	const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // setIsAuth(false);
    // setUser(null);
    // setAccessToken("");
    alert("Logout realizado com sucesso!")
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
      { 
        isAuth && user 
          &&
        <>
          <Link to={`/users/${user.id}`}>
            <Button  className="login-button" text={user.username} />
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