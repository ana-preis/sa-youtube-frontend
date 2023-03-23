import React from 'react';
import './styles.css';
import Button from "../../components/Button";

const SignUp = () => {
    return (
        <div className='flex-column signup-card'>
            <div className='title'>Cadastro</div>
            <div className='flex-row signup-fields'>
                <div className='flex-column signup-field'>
                    <div>Escolha seu nome de usuário</div>
                    <input></input>
                </div>
                <div className='flex-column signup-field'>
                    <div>Digite uma senha</div>
                    <input></input>
                    <div>Mínimo de 8 caracteres</div>
                </div>
                <div className='flex-column signup-field'>
                    <div>Insira seu email</div>
                    <input></input>
                </div>
                <div className='flex-column signup-field'>
                    <div>Confirme a senha</div>
                    <input></input>
                </div>
            </div>
            <div className='flex-column asdf'>
                <Button text='Cadastre-se' />
                <div>Já é membro? Login</div>
            </div>
        </div>
    );
}

export default SignUp;