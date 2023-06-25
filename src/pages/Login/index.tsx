import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../api/api';
import { handleLogin } from "../../services/AuthService";
import { errors } from "../../services/ErrorHandler";
import { setCookie } from "../../services/cookies/CookieService";
import { isResponseError400 } from '../../services/ErrorHandler';
import { TokenAuth, UserType } from '../../types/User';
import { ResponseType } from '../../types/Http';

import { UserContext } from "../../layouts/PageBase";
import Button from "../../components/Button";

interface LoginProps {
  isErrorRedirect?: boolean | undefined;
}

const Login = (props: LoginProps) => {

  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { userContext } = context || {};
  const updateUser = userContext[1];

  let { isErrorRedirect } = props;

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [alertEmail, setAlertEmail] = useState(false);
	const [alertEmailFormat, setAlertEmailFormat] = useState(false);
	const [alertPassword, setAlertPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  useEffect(() => {
    console.log(isErrorRedirect)
    if (isErrorRedirect) {
      toast.info("Faça o login primeiro para acessar essa página!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      isErrorRedirect = false;
    }
  },[isErrorRedirect])

  const toggleInputType = () => {
    if (inputType == "password") setInputType("text");
    else setInputType("password");
  }

	const validateInputs = () => {
		if (email === "") {
			setAlertEmail(true);
		}
		if (password === "") {
			setAlertPassword(true);
		}
		if (email === "" || password === "") {
			return true;
		}
		if(!emailRegex.test(email)) {
			setAlertEmailFormat(true)
			return true;
		}
		return false;
	}

	const login = async () => {
    const response = await handleLogin(email, password)
    if (isResponseError400(errors.ERR_LOGIN, response)) return;
    const tokens = response.data as TokenAuth;
    setCookie("accessToken", tokens.accessToken, 7);
    setCookie("refreshToken", tokens.refreshToken, 7);
	}

  const getUser = async () => {
    try {
      const response = await api.get<ResponseType>(`http://localhost:8080/me`)
      if (!response || isResponseError400(errors.ERR_LOGIN, response ?? { status: 400, data: null })) return;
      if (response) {
        const data = response.data as UserType;
        updateUser(data);
        setCookie("userID", data.id, 7);
      }
    } catch (error) {
			console.error(errors.ERR_LOGIN, error);
			toast.error(`${errors.ERR_LOGIN}${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
			setEmail("");
			setPassword("");
			setTimeout(() => window.location.reload(), 3000);
		}
  }

	const handleSignUp = async () => {
		if (validateInputs()) return;
    try {
      await login();
      toast(`Bem vindo :) `, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await getUser();
      navigate("/");
    } catch (error) {
      console.error(errors.ERR_LOGIN, error);
      toast.error(`${errors.ERR_LOGIN}${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
      setEmail("");
      setPassword("");
    }
	}

	return (
		<div className="flex-column login-card">
			<h2 className="title">Login</h2>
			<div className="flex-column signup-fields jc-center">
        <div className="flex-column signup-field_login">
					<div>Email:</div>
					<input className="input-login" onChange={e => setEmail(e.target.value)} value={email} />
					{alertEmail &&
					<span className="alert-text_login">Email não pode ficar vazio!</span>}
					{alertEmailFormat &&
					<span className="alert-text_login">Email inválido!</span>}
				</div>
				<div className="flex-column signup-field_login">
					<div>Senha:</div>
          <div className="flex-row">
            <input className="input-login" type={inputType} onChange={e => setPassword(e.target.value)} value={password} />
            <a onClick={() => toggleInputType()}>
              { inputType == 'password' ? <img src="./eye.svg" alt="show-password"/> : <img src="./eye-closed.svg" alt="hide-password" />} 
            </a>
          </div>
					<div className="flex-row password-msgs-login">
						{alertPassword && 
						<span className="alert-text_login">Senha não pode ficar vazia!</span>}
					</div>
				</div>
			</div>
			
			<div className="flex-column">
				<Button className="btn-cadastro" text="Entrar" onClick={handleSignUp} />
				<p className="login-redirect">Ainda não é membro? <Link to="/signup" className="login-link">Cadastre-se.</Link></p>
			</div>
      <ToastContainer />
		</div>
	)
}

export default Login;