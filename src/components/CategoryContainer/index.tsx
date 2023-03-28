import "./styles.css";
import { MockCategoryList } from "../../mocks/MockCategoryList";
import { Category } from "../../types/Category";
import { truncateVideoCount } from "../../helpers/truncateVideoCount";

const CategoryContainer = () => {
  const renderCategory = (category: Category) => {
    const videoCount = truncateVideoCount(category.viewCount);
    return (
      <div className="flex-column">
        <div className="category-title flex-row">
          {category.name}
          <button>
            <img src="./heart.svg" alt="icon-heart" className="icon-heart" />
          </button>
        </div>
        <iframe
          className="video"
          src={category.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="video-footer flex-row">
          <span className="video-footer-text">
            + {videoCount}k visualizacoes
          </span>
          <button>
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
    <div className="flex-column width-100">
      <div className="title">Categorias</div>
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
