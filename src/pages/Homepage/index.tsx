
import React from "react";
import BigLogoCard from "../../components/BigLogoCard";
import Button from "../../components/Button";
import RowCategory from "../../components/RowCategory";
import './styles.css'

function Homepage() {
    return (
      <>
        <div className="flex-column home-main-text">
          <h2 className="text-h2">Acesse avaliações de conteúdos educativos do Youtube</h2>
          <span className="text-span">Encontre milhares de avaliações, vídeos em alta  e grupos perfeitos para você - tudo a um click de distância. </span>
          <Button className="sign-up-btn" text="Cadastre-se"/>
        </div>
        <div className="img-container-bg">
          <img src="./img-home-bg.svg" alt="icon-search" className="img-home-bg"/>
        </div>
        <RowCategory />
        <BigLogoCard />
      </>
    );
}

export default Homepage;