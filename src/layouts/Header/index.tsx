import Button from '../../components/Button';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useUser } from "../PageBase";
import './styles.css';

const Header = () => {

  const { isAuth, setIsAuth, user, setUser, setAccessToken } = useUser();
	const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    setUser(null);
    setAccessToken("");
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
      {isAuth && user &&
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