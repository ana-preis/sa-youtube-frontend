
import React, {useState} from "react";
import BigLogoCard from "../../components/BigLogoCard";
import Button from "../../components/Button";
import RowCategory from "../../components/RowCategory";
import { handleFetchVideos } from "../../services/VideoServices";
import './styles.css'

const Homepage = () => {

  const [searchType, setSearchType] = useState("videos")

  const searchVideos = (text: string): any => {
    if(searchType === "videos") {
      const videos = handleFetchVideos(text);
    } else {

    }
    
  }

  const handleOnChangeDropdown = (type: string): any => {
    setSearchType(type);
  }

    return (
      <>
        <div className="flex-column home-main-text">
          <h2>Acesse avaliações de conteúdos educativos do Youtube</h2>
          <span className="text-span">Encontre milhares de avaliações, vídeos em alta  e grupos perfeitos para você - tudo a um click de distância. </span>
          <Button className="sign-up-btn" text="Cadastre-se" />
        </div>
          <img src="./img-home-bg.svg" alt="icon-search" className="img-home-bg"/>
        <RowCategory onSearch={searchVideos} handleOnChangeDropdown={handleOnChangeDropdown}/>
        <BigLogoCard />
      </>
    );
}

export default Homepage;