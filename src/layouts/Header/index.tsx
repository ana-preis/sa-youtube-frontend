import { useContext, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { api } from '../../api/api';
import { getCookie, setCookie } from '../../services/cookies/CookieService';
import { handleRevoke } from '../../services/AuthService';
import { errors, isResponseError400 } from '../../services/ErrorHandler';
import { UserType } from '../../types/User';
import { ResponseType } from '../../types/Http';
import { UserContext } from '../PageBase';
import Button from '../../components/Button';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

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
    try {
      const response = await api.get<ResponseType>(`http://localhost:8080/me`)
      if (!response || isResponseError400(errors.ERR_LOGIN, response ?? { status: 400, data: null })) return;
      if (response) {
        const data = response.data as UserType;
        setUser(data);
        setShouldRenderProfileName(true);
      }
    } catch(error) {
      setShouldRenderProfileName(true);
      setCookie("accessToken", "", 7);
      setCookie("refreshToken", "", 7);
      setCookie("userID", "", 7);
      setUser(null);
      console.error(errors.ERR_LOGIN, error);
      window.location.reload();
    }
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
    
    const fetchData = async () => {
      if (!userID) {
        setShouldRenderProfileName(false);
        return;
      }
      if (userID && !user) {
        await getUser(userID);
        setShouldRenderProfileName(true);
        return;
      }
      if (user && isAuth && location.pathname !== `/users/${userID}`) {
        setShouldRenderProfileName(true);
        return
      }
      setShouldRenderProfileName(false);
      return;
    }
    fetchData();
  }, [user, location.pathname])

  const handleLogout = async () => {
    try {
      // await handleRevoke();
      setCookie("accessToken", "", 7);
      setCookie("refreshToken", "", 7);
      setCookie("userID", "", 7);
      setUser(null);
      toast("Logout realizado com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate("/")
    } catch (error) {
      toast.error(`Algo deu errado: ${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

  }

	return (
		<div className="header-container">
			<Link to="/" className="link_header">
				<a className="logo-container">
						<img src="./log2.svg" alt="logo" className="logo-image"></img>
						<div className="logo-text">ComuniTube</div>
				</a>
      </Link>
      <div className="flex-row">
        { shouldRenderProfileName && user &&
          <Link to={`/users/profile`} className="no-padding">
            <Button  className="login-button" text={user.username} />
          </Link> }
        { shouldRenderLogout &&
          <Button className="login-button" text="Sair" onClick={() => handleLogout()}/> }
        { shouldRenderLogin &&
          <Link to="/login" className="no-padding">
            <Button className="login-button" text="Login"/>
          </Link> }
          <ToastContainer className="toast-container-header" />
      </div>
		</div>
	)  
}

export default Header;