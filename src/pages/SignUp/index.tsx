import React from 'react';
import './styles.css';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const SignUp = () => {
    return (
        <>
            <Header />
            <div className="signup-card">
                <div className="title">Cadastro</div>
                <div className="signup-fields">
                    <div className="signup-field">
                        <div>Escolha seu nome de usuário</div>
                        <input></input>
                    </div>
                    <div className="signup-field">
                        <div>Digite uma senha</div>
                        <input></input>
                        <div>Mínimo de 8 caracteres</div>
                    </div>
                    <div className="signup-field">
                        <div>Insira seu email</div>
                        <input></input>
                    </div>
                    <div className="signup-field">
                        <div>Confirme a senha</div>
                        <input></input>
                    </div>
                </div>
                <Button text="Cadastre-se" />
                <div>Já é membro? Login</div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;