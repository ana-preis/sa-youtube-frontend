import "./styles.css";
import { CategorySearchType } from "../../types/Category";
import CategoryCard from '../CategoryCard';


interface CategoryContainerProps {
  handleOnClickAllCategories: () => any;
  categories: CategorySearchType[];
  onClickSubscribe: (category: CategorySearchType) => any;
}

const CategoryContainer = (props: CategoryContainerProps) => {

  const { handleOnClickAllCategories, categories, onClickSubscribe } = props;

  const renderCategory = (category: CategorySearchType) => {
    if(!category.videoDTOList) category.videoDTOList = [];
    return (
      <CategoryCard category={category} onClickSubscribe={onClickSubscribe} />
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
