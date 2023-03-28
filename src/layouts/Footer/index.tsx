import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="logo">ComuniTube</div>
      <div>
        &copy; Todos os direitos reservados. (CNPJ: 000000000000) Rua Santa
        Ricota, av. Tulipa, Florianópolis, Sc cep 000000. Telefone: 48 3333-333
      </div>
      <div className="contacts link-contacts">
        <a className="">Instagram</a>
        <a className="">Email</a>
        <a className="">Twitter</a>
        <a className="">Youtube</a>
      </div>
    </footer>
  );
};

export default Footer;
