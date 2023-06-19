import { useContext, useState } from 'react';
import './styles.css';
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { handleLogin } from "../../services/AuthService";
import { errors } from "../../services/ErrorHandler";
import { UserContext } from "../../layouts/PageBase";
import { setCookie, getCookie } from "../../services/cookies/CookieService";
import { TokenAuth, UserType } from '../../types/User';
import { isResponseError400 } from '../../services/ErrorHandler';
import { api } from '../../api/api';
import { ResponseType } from '../../types/Http';

const Login = () => {

  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { userContext } = context || {};

  const updateUser = userContext[1];

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [alertEmail, setAlertEmail] = useState(false);
	const [alertEmailFormat, setAlertEmailFormat] = useState(false);
	const [alertPassword, setAlertPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

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
		handleLogin(email, password)
		.then((response) => {
      console.log(response)
      if (isResponseError400(errors.ERR_LOGIN, response)) return;
      return response.data as TokenAuth;
		}).then((tokens) => {
			if (!tokens) throw new Error("Erro ao obter tokens de acesso")
      setCookie("accessToken", tokens.accessToken, 7);
			setCookie("refreshToken", tokens.refreshToken, 7);
		})
    .catch((error) => {
			console.error(errors.ERR_LOGIN, error);
			alert(`${errors.ERR_LOGIN}${error}`);
			setEmail("");
			setPassword("");
			// window.location.reload();
		});
	}

  const getUser = async () => {
    try {
      const response = await api.get<ResponseType>(`http://localhost:8080/me`)
      console.log("entrou then, response: ", response)
      if (!response && isResponseError400(errors.ERR_LOGIN, response ?? { status: 400, data: null })) return;
      if (response) {
        const data = response.data as UserType;
        console.log( " sucesso ", data)
        updateUser(data);
        setCookie("userID", data.id, 7);
      }
    } catch (error) {
			console.error(errors.ERR_LOGIN, error);
			alert(`${errors.ERR_LOGIN}${error}`);
			setEmail("");
			setPassword("");
			// window.location.reload();
		}
  }

	const handleSignUp = async () => {
		if (validateInputs()) return;
    try {
      await login();
      alert(`Bem vindo :) `);
      await getUser();
      // navigate("/");
    } catch (error) {
      console.error(errors.ERR_LOGIN, error);
      alert(`${errors.ERR_LOGIN}${error}`);
      // navigate("/login");
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
              <img src="./eye.svg" alt="show-password"/>  
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
		</div>
	);
}

export default Login;