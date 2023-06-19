import Button from '../../components/Button';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../PageBase';
import { getCookie, setCookie } from '../../services/cookies/CookieService';
import { errors, isResponseError400 } from '../../services/ErrorHandler';
import { UserType } from '../../types/User';
import { api } from '../../api/api';
import { ResponseType } from '../../types/Http';

const Header = () => {
  const context = useContext(UserContext);
  const { 
    userContext
  } = context || {};

  const [user, setUser] = userContext;
  const [shouldRenderProfileName, setShouldRenderProfileName] = useState<boolean | undefined>();
  const [shouldRenderLogin, setShouldRenderLogin] = useState<boolean | undefined>();
  const [shouldRenderLogout, setShouldRenderLogout] = useState<boolean | undefined>();

	const location = useLocation();
  const navigate = useNavigate();

  const getUser = async (userID: string) => {
    await api.get<ResponseType>(`http://localhost:8080/me`)
    .then((response) => {
      if (!response && isResponseError400(errors.ERR_LOGIN, response ?? { status: 400, data: null })) return;
      if (response) {
        const data = response.data as UserType;
        setUser(data);
        setShouldRenderProfileName(true);
      }
    })
    .catch((error) => {
      console.error(errors.ERR_LOGIN, error);
      alert(`${errors.ERR_LOGIN}"Ocorreu um erro ao buscar o usuario de id: ${userID}`);
      window.location.reload();
    });
  }

  const willRenderLogin = (isAuth: boolean) => {
    if (isAuth || location.pathname === "/login") {
      setShouldRenderLogin(false);
    } 
    else setShouldRenderLogin(true);
  }

  const willRenderLogout = (isAuth: boolean) => {
    if (isAuth) setShouldRenderLogout(true);
    else setShouldRenderLogout(false);
  }

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    let isAuth: boolean;
    accessToken === '' ? isAuth = false : isAuth = true
    const userID = getCookie("userID");
    willRenderLogin(isAuth);
    willRenderLogout(isAuth);
    
    console.log(userID)
    const fetchData = async () => {
      if (!userID) setShouldRenderProfileName(false);
      if (userID && !user) {
        await getUser(userID);
        setShouldRenderProfileName(true);
      }
      if(user && isAuth && location.pathname !== `/users/${userID}`) setShouldRenderProfileName(true);
      setShouldRenderProfileName(false);
    }
    fetchData();
  }, [user, location.pathname])

  const handleLogout = () => {
    setCookie("accessToken", "", 7);
    setCookie("refreshToken", "", 7);
    setCookie("userID", "", 7);
    setUser(null);
    alert("Logout realizado com sucesso!")
    window.location.reload();
  }

	return (
		<div className="header-container">
			<Link to="/" className="link_header">
				<a className="logo-container">
						<img src="./log2.svg" alt="logo" className="logo-image"></img>
						<div className="logo-text">ComuniTube</div>
				</a>
			</Link>
      { shouldRenderProfileName && user &&
        <Link to={`/users/${user.id}`}>
          <Button  className="login-button" text={user.username} />
        </Link> }
      { shouldRenderLogout &&
        <Button className="login-button" text="Sair" onClick={() => handleLogout()}/> }
      { shouldRenderLogin &&
        <Link to="/login">
          <Button className="login-button" text="Login"/>
        </Link> }
		</div>
	)  
}

export default Header;