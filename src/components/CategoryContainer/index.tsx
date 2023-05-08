import "./styles.css";
import { MockCategoryList } from "../../mocks/MockCategoryList";
import { CategoryType } from "../../types/Category";
import { truncateVideoCount } from "../../helpers/truncateVideoCount";
import { videoUrl } from "../../helpers/videoTransformer";

const CategoryContainer = () => {
  const renderCategory = (category: CategoryType) => {
    const videoCount = truncateVideoCount(category.viewCount);
    return (
      <div className="flex-column">
        <div className="category-title flex-row">
          {category.name}
          <button>
            <img src="./heart.svg" alt="icon-heart" className="icon-heart" />
          </button>
        </div>
        {category.videoList ? 
          <iframe
            className="video"
            src= {videoUrl(category.videoList[0].id)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          :
          <div className="video"></div>
        }
        <div className="video-footer flex-row">
          <span className="video-footer-text">
            + {videoCount}k visualizacoes
          </span>
          <button className="arrow-left_btn">
            <img
              src="./arrow-left.svg"
              alt="arrow-left"
              className="arrow-left"
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-column width-100 ai-center">
      <div className="title">Categorias:</div>
      <div className="category-container">
        {MockCategoryList.map((c) => renderCategory(c))}
      </div>
      <div className="flex-row category-btn-row">
        <a href="" className="btn category-btn flex-row">
          Ver todas
          <img src="./more.svg" alt="icon-more" className="icon-more" />
        </a>
      </div>
    </div>
  );
};

export default CategoryContainer;
