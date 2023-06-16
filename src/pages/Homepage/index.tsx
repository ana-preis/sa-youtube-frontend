
import { useContext, useState } from "react";
import BigLogoCard from "../../components/BigLogoCard";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import CategoryContainer from "../../components/CategoryContainer";
import { handleFetchVideos } from "../../services/VideoServices";
import { handleFetchCategoriesByName } from "../../services/CategoryServices";
import './styles.css'
import { errors } from "../../services/ErrorHandler";
import SearchResults from "../../components/SearchResults";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { CategorySearchType } from "../../types/Category";
import { UserContext } from "../../layouts/PageBase";
import { UserType } from "../../types/User";
import { handleDeleteCategoryToUser, handleSaveCategoryToUser } from "../../services/UserService";
import { handleSortVideoList } from "../../helpers/videoTransformer";

const Homepage = () => {

  const navigate = useNavigate();
  const categoryLoader: CategorySearchType[] = useLoaderData() as CategorySearchType[];

  const context = useContext(UserContext);
  const { 
    userContext,
  } = context || {};

  const [userState, setUSerState] = useState<UserType | null>(userContext[0] ?? null)
  const [selectedFilter, setSelectedFilter] = useState<string>("videos")
  const [searchType, setSearchType] = useState<string>("")
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [data, setData] = useState<any>()
  const [searchText, setSearchText] = useState<string>()

  const onClickSearch = async (text: any, listType: string) => {
    setSearchType(listType)
    setSearchText(text)
    if(listType === "videos") {
      handleFetchVideos(text)
      .then((v) => {
        setData(v)
        setIsFilterActive(true)
      }).catch((error) => {
        console.error(errors.ERR_SEARCH_VIDEOS_BY_TEXT, error);
        alert(`${errors.ERR_SEARCH_VIDEOS_BY_TEXT}${text}. error: ${error}`)
        navigate("/")
      });
    } else {
      handleFetchCategoriesByName(text)
      .then((v) => {
        setData(v)
        setIsFilterActive(true)
      }).catch((error) => {
        console.error(errors.ERR_SEARCH_CATEGORIES_BY_TEXT, error);
        alert(`${errors.ERR_SEARCH_CATEGORIES_BY_TEXT}${text}. error: ${error}`)
        navigate("/")
      });
    }
    
  }

  const handleOnClickAllCategories = () => {
    navigate("/categories")
  }

  const handleOnClickSubscribe = (category: CategorySearchType) => {

    if(userState && userState.id && userState?.subscriptions) {
      const list = userState.subscriptions.filter((c) => {
        c.id === category.id
      })

      if (list.length === 0) {
        handleSaveCategoryToUser(userState.id, category.id).then(() => {
          alert("Nova categoria salva com sucesso!")
        }).catch((error) => {
          console.error(errors.ERR_SUBSCRIBE, error);
          alert(`${errors.ERR_SUBSCRIBE}${category.name}. error: ${error}`)
        })

      } else {
        handleDeleteCategoryToUser(userState.id, category.id).then(() => {
          alert("Categoria removida do usuario com sucesso!")
        }).catch((error => {
          console.error(errors.ERR_UNSUBSCRIBE, error);
          alert(`${errors.ERR_UNSUBSCRIBE}${category.name}. error: ${error}`)
        }))
      }

      navigate("/")
    }
  }

  const sortCategoryList = (): CategorySearchType[] => {
    let list = [];
    list = categoryLoader.sort((a,b) => handleSortVideoList(a,b) )
    return list.slice(0,4)
  }

  return (
    <>
      <div className="flex-column home-main-text">
        <h2 className="t1">Acesse avaliações de conteúdos educativos do Youtube</h2>
        <span className="text-span">Encontre milhares de avaliações, vídeos em alta  e grupos perfeitos para você - tudo a um click de distância. </span>
        <Link to="/signup">
          <Button className="sign-up-btn" text="Cadastre-se" />
        </Link>
      </div>
      <img src="./img-home-bg2.png" alt="icon-search" className="img-home-bg"/>
      <SearchBar 
        onClickSearch={onClickSearch} 
        listType={selectedFilter ?? ""} 
        isDropdownVisible={true}
      />
      {!isFilterActive ?
        <>
          <CategoryContainer categories={sortCategoryList()} handleOnClickAllCategories={handleOnClickAllCategories} onClickSubscribe={handleOnClickSubscribe}/>
          <BigLogoCard />
        </>
      :
        <SearchResults listType={searchType} data={data} searchText={searchText}/>}
    </>
  );
}

export default Homepage;