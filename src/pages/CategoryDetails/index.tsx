import { useState } from 'react';
import { CategoryType } from "../../types/Category";
import {
  useLoaderData,
} from "react-router-dom";
import './styles.css'
import SearchBar from "../../components/SearchBar";
import { handleFetchVideosByCategoryID } from "../../services/VideoServices";
import CategoryHeader from "./components/CategoryHeader";
import BestRatedList from "./components/BestRatedList";
import MostPopular from "./components/MostPopularList";
import AllVideosList from "./components/AllVideosList";

const CategoryDetails = () => {

  const categoryLoader: CategoryType = useLoaderData() as CategoryType;

  const [selectedFilter, setSelectedFilter] = useState<string>("videos")
  const [category] = useState<CategoryType>(categoryLoader)
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [searchType, setSearchType] = useState<string>("")
  const [data, setData] = useState<any>()
  const [searchText, setSearchText] = useState<string>()

  const onClickSearch = async (text: string) => {
    setSearchType(selectedFilter)
    setSearchText(text)
    handleFetchVideosByCategoryID(text, category.id).then((v) => {
      setData(v)
      setIsFilterActive(true)
    })
    
  }

  const renderDefaultContainers = () => {
    return (
      <>
        <CategoryHeader category={category} />
        <hr className="category-details-hr" />
        <BestRatedList videos={category.videoDTOList} />
        <hr className="category-details-hr" />
        <MostPopular videos={category.videoDTOList} />
        <hr className="category-details-hr" />
        <AllVideosList videos={category.videoDTOList}/>
      </>
    )
  }

  const renderVideoSearchList = () => {
    console.log("render , ", data)
    return (
      <AllVideosList videos={data} title="" />
    )
  }

  return (
    <div className="width-100 flex-column category-details-container">
      <SearchBar 
        onClickSearch={onClickSearch} 
        listType={selectedFilter ?? ""}
        isDropdownVisible={false}
        placeholder="Pesquise os vídeos dessa categoria aqui"
      />
      {isFilterActive ? renderVideoSearchList() : renderDefaultContainers()}
    </div>
  )
}

export default CategoryDetails;