import { CategorySearchType } from "../../../../types/Category";
import { truncateVideoCount } from "../../../../helpers/truncateVideoCount";
import { videoUrl } from "../../../../helpers/videoTransformer";
import { Link } from 'react-router-dom';
import './styles.css';

interface CategoryListV2Props {
  categories: CategorySearchType[];
}

const CategoryListV2 = (props: CategoryListV2Props) => {
  const { categories } = props;

  const renderCategory = (category: CategorySearchType) => {
    if(!category.videoDTOList) category.videoDTOList = [];
    const videoCount = truncateVideoCount(category.viewCount);
    return (
      <Link to={`/categories/${category.id}`} className="flex-column cards-category_containerv2">
        <div className="category-titlev2 flex-row">
          {category.name}
          <button>
            <img src="./heart.svg" alt="icon-heart" className="icon-heartv2" />
          </button>
        </div>
        {category.videoDTOList.length > 0 ? 
          <iframe
            className="videov2"
            src= {videoUrl(category.videoDTOList[0].id)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          :
          <div className="videov2 flex-column jc-center">
            <span className="no-videosv2">Ainda não há vídeos nessa categoria</span>
          </div>
        }
        <div className="video-footerv2 flex-row">
          {
            category.videoDTOList.length > 0 ??
              <span className="video-footer-textv2">
                + {videoCount}k visualizações
              </span>
          }
          <button className="arrow-left_btnv2">
            <img
              src="./arrow-left.svg"
              alt="arrow-left"
              className="arrow-leftv2"
            />
          </button>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex-column width-100 ai-center">
      <div className="titlev2">Categorias:</div>
      <div className="category-containerv2">
        {categories.map((c) => renderCategory(c))}
      </div>
    </div>
  );
}

export default CategoryListV2;