import { useContext, useState } from 'react';
import { CategorySearchType, CategoryType } from "../../types/Category";
import {
  useLoaderData,
} from "react-router-dom";
import './styles.css'
import { errors } from "../../services/ErrorHandler";
import SearchBar from "../../components/SearchBar";
import { handleFetchVideosByCategoryID } from "../../services/VideoServices";
import Breadcrumbs from "../../components/Breadcrumbs";
import CategoryListV2 from './components/CategoryListV2';
import { ResponseType } from '../../types/Http';
import { UserContext } from "../../layouts/PageBase";
import { UserType } from '../../types/User';

const Categories = () => {

  const categoryLoader: ResponseType = useLoaderData() as ResponseType;
  const categoriesData = categoryLoader.data as CategorySearchType[]
  const context = useContext(UserContext);
  const { 
    userContext
  } = context || {};

  const [userState, setUSerState] = useState<UserType | null>(userContext[0] ?? null);

  const [selectedFilter, setSelectedFilter] = useState<string>("videos")
  const [categories, setCategories] = useState<CategorySearchType[]>(categoriesData)
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [searchType, setSearchType] = useState<string>("")
  const [data, setData] = useState<CategorySearchType[]>(categoriesData)
  const [searchText, setSearchText] = useState<string>()

  const onClickSearch = async (text: string) => {
    if (text === "" || text === undefined) setData(categoriesData);
    const listByName = categories.filter((c) => {
      return c.name.toLowerCase().includes(text.toLowerCase())
    })
    const listByDescription = categories.filter((c) => {
      return c.description?.toLowerCase().includes(text.toLowerCase())
    })
    const result = Array.from(new Set(listByName.concat(listByDescription)))
    setData(result)
    setIsFilterActive(true)
  }

  return (
    <div className="width-100 flex-column category-details-container">
      <Breadcrumbs className="breadcrumb-category" breadcrumbPage="Categorias"/>
      <SearchBar 
        onClickSearch={onClickSearch} 
        listType={selectedFilter ?? ""}
        isDropdownVisible={false}
        placeholder="Pesquise uma categoria aqui"
      />
      <CategoryListV2 categories={isFilterActive ? data : categories} user={userState} />
    </div>
  )
}

export default Categories;