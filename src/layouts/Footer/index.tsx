import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="logo">ComuniTube</div>
      <div>
        <p>
           Endereço: Rua Santa Ricota, av. Tulipa, Florianópolis, Sc cep 000000. Telefone: 48 3333-333. (CNPJ: 000000000000) .
        </p>
        <p>Por Ana Rute Preis e Silva e Rafael do Nascimento Pereira. &copy; Todos os direitos reservados.</p>
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
