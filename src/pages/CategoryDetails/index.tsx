import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  useLoaderData,
  useNavigate
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import { errors } from "../../services/ErrorHandler";
import { handleFetchVideosByCategoryID } from "../../services/VideoServices";
import { handleOnClickSubscribe } from '../../services/CategoryServices';
import { CategorySearchType } from "../../types/Category";
import { VideoType } from '../../types/Video';
import { ResponseType } from '../../types/Http';

import { UserContext } from '../../layouts/PageBase';
import SearchBar from "../../components/SearchBar";
import CategoryHeader from "./components/CategoryHeader";
import BestRatedList from "./components/BestRatedList";
import MostPopular from "./components/MostPopularList";
import AllVideosList from "./components/AllVideosList";
import Breadcrumbs from "../../components/Breadcrumbs";

const CategoryDetails = () => {

  const categoryLoader: ResponseType = useLoaderData() as ResponseType;
  const context = useContext(UserContext);
  const { userContext } = context || {};

  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>("videos");
  const [category] = useState<CategorySearchType>(categoryLoader.data as CategorySearchType);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>("");
  const [data, setData] = useState<any>();
  const [searchText, setSearchText] = useState<string>();
  const [userState, setUserState] = userContext;

  const onClickSearch = async (text: string) => {
    setSearchType(selectedFilter)
    setSearchText(text)
    handleFetchVideosByCategoryID(text, category.id)
    .then((v) => {
      setData(v.data)
      setIsFilterActive(true)
    }).catch((error) => {
      console.error(errors.ERR_SEARCH_VIDEOS_BY_CATEGORY, error);
			toast.error(`${errors.ERR_SEARCH_VIDEOS_BY_CATEGORY}${category.id}. error: ${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate(`/categories/${category.id}`)
    });
  }

  const handleOnClick = async () => {
    if(!userState) return;
    await handleOnClickSubscribe(category, userState, setUserState)
  }

  const renderDefaultContainers = () => {
    return (
      <>
        <CategoryHeader category={category} onSubscribe={handleOnClick} user={userState}/>
        <hr className="category-details-hr" />
        <BestRatedList videos={category.videoDTOList ?? []} />
        <hr className="category-details-hr" />
        <MostPopular videos={category.videoDTOList ?? []} />
        <hr className="category-details-hr" />
        <AllVideosList videos={category.videoDTOList ?? []}/>
      </>
    )
  }

  const renderVideoSearchList = () => {
    return (
      <AllVideosList videos={data as VideoType[]} title="" />
    )
  }

  return (
    <div className="width-100 flex-column category-details-container">
      <Breadcrumbs className="breadcrumb-category" breadcrumbPage={category.name}/>
      <SearchBar 
        onClickSearch={onClickSearch} 
        listType={selectedFilter ?? ""}
        isDropdownVisible={false}
        placeholder="Pesquise os vídeos dessa categoria aqui"
      />
      {isFilterActive ? renderVideoSearchList() : renderDefaultContainers()}
      <ToastContainer  />
    </div>
  )
}

export default CategoryDetails;