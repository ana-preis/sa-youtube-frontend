
import React, {useState} from "react";
import BigLogoCard from "../../components/BigLogoCard";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import CategoryContainer from "../../components/CategoryContainer";
import { handleFetchVideos } from "../../services/VideoServices";
import { handleFetchCategoriesByName } from "../../services/CategoryServices";
import './styles.css'
import SearchResults from "../../components/SearchResults";
import { Link } from 'react-router-dom';

const Homepage = () => {

  const [selectedFilter, setSelectedFilter] = useState<string>("videos")
  const [searchType, setSearchType] = useState<string>("")
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [data, setData] = useState<any>()
  const [searchText, setSearchText] = useState<string>()

  const onClickSearch = async (text: any) => {
    setSearchType(selectedFilter)
    setSearchText(text)
    let response;
    if(selectedFilter === "videos") {
      handleFetchVideos(text).then((v) => setData(v));
    } else {
      handleFetchCategoriesByName(text).then((v) => setData(v))
    }
    setIsFilterActive(true)
  }

  const handleOnChangeDropdown = (type: string): any => {
    setSelectedFilter(type);
  }

  return (
    <>
      <div className="flex-column home-main-text">
        <h2>Acesse avaliações de conteúdos educativos do Youtube</h2>
        <span className="text-span">Encontre milhares de avaliações, vídeos em alta  e grupos perfeitos para você - tudo a um click de distância. </span>
        <Link to="/signup">
          <Button className="sign-up-btn" text="Cadastre-se" />
        </Link>
      </div>
      <img src="./img-home-bg.svg" alt="icon-search" className="img-home-bg"/>
      <SearchBar 
        setIsFilterActive={setIsFilterActive} 
        onClickSearch={onClickSearch} 
        handleOnChangeDropdown={handleOnChangeDropdown} 
        listType={selectedFilter ?? ""} 
      />
      {!isFilterActive ?
        <>
          <CategoryContainer />
          <BigLogoCard />
        </>
      :
        <SearchResults listType={searchType} data={data} searchText={searchText}/>}
    </>
  );
}

export default Homepage;