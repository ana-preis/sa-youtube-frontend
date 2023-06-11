import { useState, useEffect } from 'react'
import "./styles.css";
import { CategorySearchType, CategoryType } from "../../types/Category";
import { truncateVideoCount } from "../../helpers/truncateVideoCount";
import { videoUrl } from "../../helpers/videoTransformer";
import { Link } from 'react-router-dom';
import { MockUserType } from "../../mocks/MockUser";

interface CategoryContainerProps {
  handleOnClickAllCategories: () => any;
  categories: CategorySearchType[];
  onClickSubscribe: (category: CategorySearchType) => any;
}

const CategoryContainer = (props: CategoryContainerProps) => {

  // user = useUser
  const [user, setUser] = useState(MockUserType)

  const { handleOnClickAllCategories, categories, onClickSubscribe } = props;

  const isCategoryubscribed = (category: CategorySearchType) :boolean => {
    if(user.subscriptions) {
      const filtered = user.subscriptions.filter((c) => {
        return c.id === category.id
      })
      return filtered.length > 0;
    }
    return false;
  }

  const renderCategory = (category: CategorySearchType) => {
    const videoCount = truncateVideoCount(category.viewCount);
    return (
      <div  className="flex-column cards-category_container">
        <div className="category-title flex-row">
          {category.name}
          <button title="Inscrever-se" onClick={() => onClickSubscribe(category)}>
            {isCategoryubscribed(category)
              ?
              <img src="./heart-fill.svg" alt="icon-heart" className="icon-heart" />
              :
              <img src="./heart.svg" alt="icon-heart" className="icon-heart" />
            }
          </button>
        </div>
        <Link to={`/categories/${category.id}`}>
          {category.videoList.length > 0 ? 
            <iframe
              className="video"
              src= {videoUrl(category.videoList[0].id)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            :
            <div className="video flex-column jc-center">
              <span className="no-videos">Ainda não há vídeos nessa categoria</span>
            </div>
          }
          <div className="video-footer flex-row">
            {
              category.videoList.length > 0 ??
                <span className="video-footer-text">
                  + {videoCount}k visualizações
                </span>
            }
            <button className="arrow-left_btn">
              <img
                src="./arrow-left.svg"
                alt="arrow-left"
                className="arrow-left"
              />
            </button>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex-column width-100 ai-center">
      <div className="title">Categorias:</div>
      <div className="category-container">
        {categories.map((c) => renderCategory(c))}
      </div>
      <div className="flex-row category-btn-row">
        <a onClick={handleOnClickAllCategories} className="btn category-btn flex-row">
          Ver todas
          <img src="./more.svg" alt="icon-more" className="icon-more" />
        </a>
      </div>
    </div>
  );
};

export default CategoryContainer;
