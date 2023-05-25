import "./styles.css";
import { CategorySearchType } from "../../types/Category";
import { truncateVideoCount } from "../../helpers/truncateVideoCount";
import { videoUrl } from "../../helpers/videoTransformer";
import { Link } from 'react-router-dom';

interface CategoryContainerProps {
  handleOnClickAllCategories: () => any;
  categories: CategorySearchType[];
}

const CategoryContainer = (props: CategoryContainerProps) => {

  const { handleOnClickAllCategories, categories } = props;

  const renderCategory = (category: CategorySearchType) => {
    const videoCount = truncateVideoCount(category.viewCount);
    return (
      <Link to={`/categories/${category.id}`} className="flex-column cards-category_container">
        <div className="category-title flex-row">
          {category.name}
          <button>
            <img src="./heart.svg" alt="icon-heart" className="icon-heart" />
          </button>
        </div>
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
