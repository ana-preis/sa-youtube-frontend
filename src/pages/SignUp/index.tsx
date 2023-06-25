import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { handleSaveNewUser } from "../../services/UserService";
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import { UserAuth } from "../../types/User";

import Button from "../../components/Button";

const SignUp = () => {
	
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [alertUsername, setAlertUsername] = useState(false);
	const [alertEmail, setAlertEmail] = useState(false);
	const [alertEmailFormat, setAlertEmailFormat] = useState(false);
	const [alertPassword, setAlertPassword] = useState(false);
	const [alertPasswordMin, setAlertPasswordMin] = useState(false);
	const [alertPasswordConfirm, setAlertPasswordConfirm] = useState(false);
  const [inputType1, setInputType1] = useState("password")
  const [inputType2, setInputType2] = useState("password")

	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  const toggleInputType1 = () => {
    if(inputType1 == "password") setInputType1("text")
    else setInputType1("password")
  }
  const toggleInputType2 = () => {
    if(inputType2 == "password") setInputType2("text")
    else setInputType2("password")
  }

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
		if (password.length < 8) {
			setAlertPasswordMin(true)
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

	const postUser = () => {
		const body: UserAuth = { 
			username, 
			email, 
			password
		}
		handleSaveNewUser(body)
		.then((response) => {
      if (isResponseError400(errors.ERR_SIGNUP, response)) return;
			toast.success(`Cadastrado com sucesso :) `, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
			navigate("/login")
		}).catch((error) => {
			console.error(errors.ERR_SIGNUP, error);
			toast.error(`${errors.ERR_SIGNUP}${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
			setTimeout(() => window.location.reload(), 3000);
		});
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
          <div className="flex-row">
            <input className="input-login" type={inputType1} onChange={e => setPassword(e.target.value)} />
            <a onClick={(e) => toggleInputType1()}>
              <img src="./eye.svg" alt="show-password" className=""/>  
            </a>
          </div>
					<div className="flex-row password-msgs">
						{alertPassword && 
						<span className="alert-text-password">Senha não pode ficar vazia!</span>}
						{alertPasswordMin && 
						<span className="alert-text-password">Senha não ter menos que 8 caracteres!</span>}
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
					<div className="flex-row">
            <input className="input-login" type={inputType2} onChange={e => setPasswordConfirm(e.target.value)}/>
            <a onClick={() => toggleInputType2()}>
              <img src="./eye.svg" alt="show-password"/>  
            </a>
          </div>
					{alertPasswordConfirm &&
					<span className="alert-text">As senhas são diferentes!</span>}
				</div>
			</div>
			<div className="flex-column">
				<Button className="btn-cadastro" text="Cadastre-se" onClick={handleSignUp} />
				<p className="login-redirect">Já é membro? <Link to="/login" className="login-link">Login.</Link></p>
			</div>
      <ToastContainer  />
		</div>
	);
}

export default SignUp;