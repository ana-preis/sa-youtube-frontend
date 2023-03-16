import React from "react";
import './styles.css'

const Footer = () => {
    return (
        <footer id="footer">
            <div className="logo">ComuniTube</div>
            <div>&copy; Todos os direitos reservados. (CNPJ: 000000000000)  Rua Santa Ricota, av. Tulipa, Florianópolis, Sc cep 000000. Telefone: 48 3333-333</div>
            <div className="contacts">
                <span>Instagram</span>
                <span>Email</span>
                <span>Twitter</span>
                <span>Youtube</span>
            </div>
        </footer>
    )
}

export default Footer;