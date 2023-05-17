import { useState } from 'react';
import { CategoryType } from "../../types/Category";
import {
  useLoaderData,
} from "react-router-dom";
import { MockCategory } from "../../mocks/MockCategoryList";
import './styles.css'
import SearchBar from "../../components/SearchBar";
import { handleFetchCategoriesByName } from "../../services/CategoryServices";
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
    handleFetchCategoriesByName(text).then((v) => setData(v))
    setIsFilterActive(true)
  }

  return (
    <div className="width-100 flex-column category-details-container">
      <SearchBar 
        setIsFilterActive={setIsFilterActive} 
        onClickSearch={onClickSearch} 
        listType={selectedFilter ?? ""}
        isDropdownVisible={false}
        placeholder="Pesquise os vídeos dessa categoria aqui"
      />
      <CategoryHeader category={category} />
      <hr className="category-details-hr" />
      <BestRatedList videos={category.videoList} />
      <hr className="category-details-hr" />
      <MostPopular videos={category.videoList} />
      <hr className="category-details-hr" />
      <AllVideosList videos={category.videoList}/>
    </div>
  )
}

export default CategoryDetails;