import React from "react";
import './styles.css'

const Footer = () => {
    return (
        <footer id="footer">
            <div className="logo">ComuniTube</div>
            <div>&copy; Todos os direitos reservados. (CNPJ: 000000000000)  Rua Santa Ricota, av. Tulipa, Florianópolis, Sc cep 000000. Telefone: 48 3333-333</div>
            <div className="contacts">
                <span className="span-contacts">Instagram</span>
                <span className="span-contacts">Email</span>
                <span className="span-contacts">Twitter</span>
                <span className="span-contacts">Youtube</span>
            </div>
        </footer>
    )
}

export default Footer;