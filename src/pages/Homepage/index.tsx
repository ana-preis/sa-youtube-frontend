
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
import { useLoaderData } from "react-router-dom";
import { CategorySearchType } from "../../types/Category";

const Homepage = () => {
  const categoryLoader: CategorySearchType[] = useLoaderData() as CategorySearchType[];
  const [selectedFilter, setSelectedFilter] = useState<string>("videos")
  const [searchType, setSearchType] = useState<string>("")
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [data, setData] = useState<any>()
  const [searchText, setSearchText] = useState<string>()

  const onClickSearch = async (text: any, listType: string) => {
    setSearchType(listType)
    setSearchText(text)
    if(listType === "videos") {
      handleFetchVideos(text).then((v) => {
        setData(v)
        setIsFilterActive(true)
      });
    } else {
      handleFetchCategoriesByName(text).then((v) => {
        setData(v)
        setIsFilterActive(true)
      })
    }
    
  }

  const handleOnClickAllCategories = () => {
    onClickSearch("", "categories")
  }

  const sortCategoryList = (): CategorySearchType[] => {
    let list = [];
    list = categoryLoader.sort((a,b) => b.videoList.length - a.videoList.length)
    return list.slice(0,4)
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
        onClickSearch={onClickSearch} 
        listType={selectedFilter ?? ""} 
        isDropdownVisible={true}
      />
      {!isFilterActive ?
        <>
          <CategoryContainer categories={sortCategoryList()} handleOnClickAllCategories={handleOnClickAllCategories} />
          <BigLogoCard />
        </>
      :
        <SearchResults listType={searchType} data={data} searchText={searchText}/>}
    </>
  );
}

export default Homepage;