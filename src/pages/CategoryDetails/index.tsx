import { useState } from 'react';
import { CategoryType } from "../../types/Category";
import {
  useLoaderData,
} from "react-router-dom";
import { MockCategory } from "../../mocks/MockCategoryList";
import './styles.css'
import SearchBar from "../../components/SearchBar";
import { handleFetchCategoriesByName } from "../../services/CategoryServices";

const CategoryDetails = () => {

  const categoryLoader: CategoryType = useLoaderData() as CategoryType;

  const [selectedFilter, setSelectedFilter] = useState<string>("videos")
  const [category, setCategory] = useState<CategoryType>(MockCategory)
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [searchType, setSearchType] = useState<string>("")
  const [data, setData] = useState<any>()
  const [searchText, setSearchText] = useState<string>()

  const onClickSearch = async (text: any) => {
    setSearchType(selectedFilter)
    setSearchText(text)
    let response;
    handleFetchCategoriesByName(text).then((v) => setData(v))
    setIsFilterActive(true)
  }

  const handleOnChangeDropdown = (type: string): any => {
    setSelectedFilter(type);
  }

  return (
    <div className="width-100 flex-column category-details-container">
      <SearchBar 
        setIsFilterActive={setIsFilterActive} 
        onClickSearch={onClickSearch} 
        handleOnChangeDropdown={handleOnChangeDropdown} 
        listType={selectedFilter ?? ""} 
      />
    </div>
  )
}

export default CategoryDetails;