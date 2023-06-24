import React from "react";
import "./styles.css";

const BigLogoCard = () => {
  const firstText =
    "Participe de grupos relacionados à conteúdos do seu interesse e acesse as avaliações de outros usuários.";
  const secondText = "Acesse os vídeos mais bem avaliados pela comunidade.";

  return (
    <div className="flex-big-logo width-100 flex-row">
      <img src="./log2.svg" alt="logo" className="logo-card"></img>
      <div className="pink-big-card flex-column">
        <span className="card-text">{firstText}</span>
        <span className="card-text">{secondText}</span>
      </div>
    </div>
  );
};

export default BigLogoCard;
