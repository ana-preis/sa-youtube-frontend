import React, { useState } from 'react';
import './styles.css';
import { UserRequest, UserType } from "../../types/User";
import Button from "../../components/Button";
import { api } from '../../api/api';

const Login = () => {

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [alertEmail, setAlertEmail] = useState(false);
	const [alertEmailFormat, setAlertEmailFormat] = useState(false);
	const [alertPassword, setAlertPassword] = useState(false);

	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

	const validateInputs = () => {
		if (email === "") {
			setAlertEmail(true)
		}
		if (password === "") {
			setAlertPassword(true)
		}
		if(!emailRegex.test(email)) {
			setAlertEmailFormat(true)
			return true
		}
		return false;
	}

	const authUser = async () => {
		// const body:UserRequest = { 
		// 	username, 
		// 	email, 
		// 	password 
		// }
		// const response = await api.post<string, UserType>(`http://localhost:8080/users`, JSON.stringify(body))
    // alert(`Cadastrado com sucesso :) `)
    // window.location.href;
	}

	const handleSignUp = () => {
		if (validateInputs()) return;
		authUser();
	}

	return (
		<div className="flex-column login-card">
			<h2 className="title">Login</h2>
			<div className="flex-column signup-fields jc-center">
      <div className="flex-column signup-field signup-field_login">
					<div>Email:</div>
					<input className="input-login" onChange={e => setEmail(e.target.value)} />
					{alertEmail &&
					<span className="alert-text_login">Email não pode ficar vazio!</span>}
					{alertEmailFormat &&
					<span className="alert-text_login">Email inválido!</span>}
				</div>
				<div className="flex-column signup-field">
					<div>Senha:</div>
					<input className="input-login" type="password" onChange={e => setPassword(e.target.value)} />
					<div className="flex-row password-msgs-login">
						{alertPassword && 
						<span className="alert-text_login">Senha não pode ficar vazia!</span>}
					</div>
				</div>
			</div>
			
			<div className="flex-column">
				<Button className="btn-cadastro" text="Entrar" onClick={handleSignUp} />
				<p className="login-redirect">Ainda não é membro? <a className="login-link">Cadastre-se.</a></p>
			</div>
		</div>
	);
}

export default Login;