import { useContext, useState } from 'react';
import { CategoryType } from "../../types/Category";
import {
  useLoaderData,
  useNavigate
} from "react-router-dom";
import './styles.css'
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import SearchBar from "../../components/SearchBar";
import { handleFetchVideosByCategoryID } from "../../services/VideoServices";
import CategoryHeader from "./components/CategoryHeader";
import BestRatedList from "./components/BestRatedList";
import MostPopular from "./components/MostPopularList";
import AllVideosList from "./components/AllVideosList";
import Breadcrumbs from "../../components/Breadcrumbs";
import { handleSaveCategoryToUser } from '../../services/CategoryServices';
import { VideoType } from '../../types/Video';
import { ResponseType } from '../../types/Http';
import { UserContext } from '../../layouts/PageBase';
import { updateUser } from '../../services/UserService';

const CategoryDetails = () => {

  const categoryLoader: ResponseType = useLoaderData() as ResponseType;
  const context = useContext(UserContext);
  const { userContext } = context || {};

  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>("videos");
  const [category] = useState<CategoryType>(categoryLoader.data as CategoryType);
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
			alert(`${errors.ERR_SEARCH_VIDEOS_BY_CATEGORY}${category.id}. error: ${error}`)
      navigate(`/categories/${category.id}`)
    });
  }

  const handleOnSubscribe = async () => {
    try {
      if (!userState) throw new Error("Erro ao cadastrar categoria ao usuario");
      if(userState?.subscriptionsIDs?.includes(category.id)) {
        alert(" Ops! Ja se inscreveu nessa categoria!")
        return;
      }
      const response = await handleSaveCategoryToUser(userState.id, category.id);
      if (isResponseError400(errors.ERR_LOGIN, response)) return;
      alert(`Inscricao feita com sucesso!`);
      return;
    } catch(error) {
      updateUser(setUserState);
      console.error(errors.ERR_SUBSCRIBE, error);
      alert(`${errors.ERR_SUBSCRIBE}${category.name}. error: ${error}`);
      // window.location.reload();
    }
  }

  const handleOnClickSubscribe = async () => {
    await handleOnSubscribe();
    await updateUser(setUserState);
    // window.location.reload();
  }

  const renderDefaultContainers = () => {
    return (
      <>
        <CategoryHeader category={category} onSubscribe={handleOnClickSubscribe}/>
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
    </div>
  )
}

export default CategoryDetails;