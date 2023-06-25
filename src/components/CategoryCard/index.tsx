import { useContext } from "react";
import { Link } from "react-router-dom";
import './styles.css'
import { CategorySearchType } from "../../types/Category";
import { UserContext } from "../../layouts/PageBase";

interface CategoryCardProps {
  category: CategorySearchType;
  onClickSubscribe: (category: CategorySearchType) => any;
}

const CategoryCard = (props: CategoryCardProps) => {

  const { category, onClickSubscribe } = props
  const context = useContext(UserContext);
  const { 
    userContext
  } = context || {};
  const [user, setUser] = userContext;

  if(!category.videoDTOList) category.videoDTOList = [];

  const isCategorySubscribed = (category: CategorySearchType) :boolean => {
    if(user && user.subscriptionsIDs) {
      return user.subscriptionsIDs?.includes(category.id)
    }
    return false;
  }

  return (
    <div  className="flex-column cards-category_container">
      <div className="flex-row jc-between">
        <Link className="category-title" to={`/categories/${category.id}`}>
          {category.name}
        </Link>
        <button title="Inscrever-se" onClick={() => onClickSubscribe(category)}>
          {isCategorySubscribed(category)
            ?
            <img src="./heart-fill.svg" alt="icon-heart" className="icon-heart" />
            :
            <img src="./heart.svg" alt="icon-heart" className="icon-heart" />
          }
        </button>
      </div>
      <Link to={`/categories/${category.id}`}>
      { category.videoDTOList.length > 0 ? 
        <div>
          <img src={category.videoDTOList[0].thumbnailUrl} alt="thumbnail" />
          <span className="no-videos">{category.videoDTOList[0].title}</span>
        </div>
        :
        <div className="video flex-column jc-center">
          <span className="no-videos">Ainda não há vídeos nessa categoria</span>
        </div>
      }
        <div className="video-footer flex-row">
          <div>
          {
            category.videoDTOList.length > 0 &&
              <span className="video-footer-text">
                {category.videoCount} vídeos
              </span>
            }
          </div>
          <div className="flex-row">
            <span className="video-footer-text">Ver mais</span>
            <button className="arrow-left_btn">
              <img
                src="./arrow-left.svg"
                alt="arrow-left"
                className="arrow-left"
              />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard