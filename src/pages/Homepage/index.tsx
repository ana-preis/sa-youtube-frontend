
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import './styles.css'
import 'react-toastify/dist/ReactToastify.css';
import { handleFetchVideos } from "../../services/VideoServices";
import { handleFetchCategoriesByName, handleOnClickSubscribe } from "../../services/CategoryServices";
import { handleSortVideoList } from "../../helpers/videoTransformer";
import { getCookie } from "../../services/cookies/CookieService";
import { errors } from "../../services/ErrorHandler";
import { CategorySearchType } from "../../types/Category";
import { ResponseType } from "../../types/Http";

import { UserContext } from "../../layouts/PageBase";
import BigLogoCard from "../../components/BigLogoCard";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import CategoryContainer from "../../components/CategoryContainer";
import SearchResults from "../../components/SearchResults";

const Homepage = () => {

  const navigate = useNavigate();
  const categoryLoader: ResponseType = useLoaderData() as ResponseType;

  const context = useContext(UserContext);
  const { 
    userContext
  } = context || {};

  const [userState, setUserState] = userContext;
  const [selectedFilter, setSelectedFilter] = useState<string>("videos");
  const [searchType, setSearchType] = useState<string>("");
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [searchText, setSearchText] = useState<string>();
  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    accessToken === "" ? setIsAuth(false) : setIsAuth(true);
  }, [isAuth])

  const onClickSearch = async (text: any, listType: string) => {
    setSearchType(listType)
    setSearchText(text)
    if(listType === "videos") {
      handleFetchVideos(text)
      .then((v) => {
        setData(v.data)
        setIsFilterActive(true)
      }).catch((error) => {
        console.error(errors.ERR_SEARCH_VIDEOS_BY_TEXT, error);
        toast.error(`${errors.ERR_SEARCH_VIDEOS_BY_TEXT}${text}. error: ${error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        navigate("/")
      });
    } else {
      handleFetchCategoriesByName(text)
      .then((v) => {
        setData(v.data)
        setIsFilterActive(true)
      }).catch((error) => {
        console.error(errors.ERR_SEARCH_CATEGORIES_BY_TEXT, error);
        toast.error(`${errors.ERR_SEARCH_CATEGORIES_BY_TEXT}${text}. error: ${error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        navigate("/")
      });
    }
    
  }

  const handleOnClickAllCategories = () => {
    navigate("/categories")
  }

  const handleClickHeart = async (category: CategorySearchType) => {
    if(!userState) return
    await handleOnClickSubscribe(category, userState, setUserState);
  }

  const sortCategoryList = (): CategorySearchType[] => {
    let list = [];
    const categories = categoryLoader.data as CategorySearchType[]
    list = categories.sort((a,b) => handleSortVideoList(a,b) )
    return list.slice(0,4)
  }

  return (
    <>
      <div className="flex-column home-main-text">
        <h2 className="t1">Acesse avaliações de conteúdos educativos do Youtube</h2>
        <span className="text-span">Encontre milhares de avaliações, vídeos em alta  e grupos perfeitos para você - tudo a um click de distância. </span>
        { !isAuth &&
          <Link to="/signup">
            <Button className="sign-up-btn" text="Cadastre-se" />
          </Link> }
      </div>
      <img src="./img-home-bg2.png" alt="icon-search" className="img-home-bg"/>
      <SearchBar 
        onClickSearch={onClickSearch} 
        listType={selectedFilter ?? ""} 
        isDropdownVisible={true}
      />
      {!isFilterActive ?
        <>
          <CategoryContainer categories={sortCategoryList()} handleOnClickAllCategories={handleOnClickAllCategories} onClickSubscribe={handleClickHeart}/>
          <BigLogoCard />
        </>
      :
        <SearchResults listType={searchType} data={data} searchText={searchText}/>}
        <ToastContainer />
    </>
  );
}

export default Homepage;