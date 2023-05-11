import React, { useState } from 'react';
import './styles.css';
import { UserRequest, UserType } from "../../types/User";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { api } from '../../api/api';

const SignUp = () => {

	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [alertUsername, setAlertUsername] = useState(false);
	const [alertEmail, setAlertEmail] = useState(false);
	const [alertEmailFormat, setAlertEmailFormat] = useState(false);
	const [alertPassword, setAlertPassword] = useState(false);
	const [alertPasswordConfirm, setAlertPasswordConfirm] = useState(false);

	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

	const validateInputs = () => {
		if (username === "") {
			setAlertUsername(true)
		}
		if (email === "") {
			setAlertEmail(true)
		}
		if (password === "") {
			setAlertPassword(true)
		}
		if (username === "" || email === "" || password === "") {
			return true;
		}
		if(!emailRegex.test(email)) {
			setAlertEmailFormat(true)
			return true
		}
		if(password !== passwordConfirm) {
			setAlertPasswordConfirm(true)
			return true;
		}
		return false;
	}

	const postUser = async () => {
		const body:UserRequest = { 
			username, 
			email, 
			password 
		}
		const response = await api.post<string, UserType>(`http://localhost:8080/users`, JSON.stringify(body))
    alert(`Cadastrado com sucesso :) `)
    window.location.href;
	}

	const handleSignUp = () => {
		if (validateInputs()) return;
		postUser();
	}

	return (
		<div className="flex-column signup-card">
			<h2 className="title">Cadastro</h2>
			<div className="flex-row signup-fields-1 jc-center">
				<div className="flex-column signup-field">
					<div>Escolha seu nome de usuário</div>
					<input className="input-login" onChange={e => setUsername(e.target.value)} />
					{alertUsername && 
					<span className="alert-text">Nome de usuário não pode ficar vazio!</span>}
				</div>
				<div className="flex-column signup-field">
					<div>Digite uma senha</div>
					<input className="input-login" type="password" onChange={e => setPassword(e.target.value)} />
					<div className="flex-row password-msgs">
						{alertPassword && 
						<span className="alert-text-password">Senha não pode ficar vazia!</span>}
						<span className="min-caract">Mínimo de 8 caracteres</span>
					</div>
				</div>
			</div>
			<div className="flex-row signup-fields-2 jc-center">
				<div className="flex-column signup-field">
					<div>Insira seu email</div>
					<input className="input-login" onChange={e => setEmail(e.target.value)} />
					{alertEmail &&
					<span className="alert-text">Email não pode ficar vazio!</span>}
					{alertEmailFormat &&
					<span className="alert-text">Email inválido!</span>}
				</div>
				<div className="flex-column signup-field">
					<div>Confirme a senha</div>
					<input className="input-login" type="password" onChange={e => setPasswordConfirm(e.target.value)} />
					{alertPasswordConfirm &&
					<span className="alert-text">As senhas são diferentes!</span>}
				</div>
			</div>
			<div className="flex-column">
				<Button className="btn-cadastro" text="Cadastre-se" onClick={handleSignUp} />
				<p className="login-redirect">Já é membro? <Link to="/login" className="login-link">Login.</Link></p>
			</div>
		</div>
	);
}

export default SignUp;