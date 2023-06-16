import { useContext, useState } from 'react';
import { CategoryType } from "../../types/Category";
import {
  useLoaderData,
  useNavigate
} from "react-router-dom";
import { UserContext, useUser } from "../../layouts/PageBase";
import './styles.css'
import { errors } from "../../services/ErrorHandler";
import SearchBar from "../../components/SearchBar";
import { handleFetchVideosByCategoryID } from "../../services/VideoServices";
import CategoryHeader from "./components/CategoryHeader";
import BestRatedList from "./components/BestRatedList";
import MostPopular from "./components/MostPopularList";
import AllVideosList from "./components/AllVideosList";
import Breadcrumbs from "../../components/Breadcrumbs";
import { handleUpdateUser } from '../../services/UserService';
import { UserType } from '../../types/User';
import { MockUserType } from '../../mocks/MockUser';

const CategoryDetails = () => {

  const categoryLoader: CategoryType = useLoaderData() as CategoryType;
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>("videos")
  const [category] = useState<CategoryType>(categoryLoader)
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [searchType, setSearchType] = useState<string>("")
  const [data, setData] = useState<any>()
  const [searchText, setSearchText] = useState<string>()
  //corrigir
  const [userState, setUserState] = useState<UserType | null>(MockUserType)

  const onClickSearch = async (text: string) => {
    setSearchType(selectedFilter)
    setSearchText(text)
    handleFetchVideosByCategoryID(text, category.id)
    .then((v) => {
      setData(v)
      setIsFilterActive(true)
    }).catch((error) => {
      console.error(errors.ERR_SEARCH_VIDEOS_BY_CATEGORY, error);
			alert(`${errors.ERR_SEARCH_VIDEOS_BY_CATEGORY}${category.id}. error: ${error}`)
      navigate(`/categories/${category.id}`)
    });
  }

  const handleOnSubscribe = () => {
    if (userState && userState.id) {
      let subscriptionList: CategoryType[] | undefined;
      if (userState.subscriptions) {
        subscriptionList = userState.subscriptions;
      } else {
        subscriptionList = []
      }
      subscriptionList.push(category)
      userState.subscriptions = subscriptionList

      handleUpdateUser(userState, userState.id).then(() => {
        alert(`Inscricao feita com sucesso!`)
        navigate(`/categories/${category.id}`)
      }).catch((error) => {
        console.error(errors.ERR_SUBSCRIBE, error);
        alert(`${errors.ERR_SUBSCRIBE}${category.name}. error: ${error}`)
      });
    }
  }

  const renderDefaultContainers = () => {
    return (
      <>
        <CategoryHeader category={category} onSubscribe={handleOnSubscribe}/>
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
    return (
      <AllVideosList videos={data} title="" />
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
    </div>
  )
}

export default CategoryDetails;