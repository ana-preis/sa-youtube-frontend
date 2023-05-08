import "./styles.css";
import { CategoryType } from "../../../../types/Category";

interface CategoryListProps {
  categories: CategoryType[];
}

const CategoryList = (props: CategoryListProps) => {

  const { categories } = props;

  const renderCategories = (category: CategoryType) => {
    return (
    <a className="category-results-container">
      <h2 className="category-title-card">{category.name}</h2>
      <p className="category-description">{category.description}</p>
      <p className="flex-row card-footer">
      <span className="card-footer-text">{category.userCount} inscritos</span>
      <span className="card-footer-text">{category.videoCount} vídeos</span>
      </p>
    </a>
    );
  };

  return (
    <div className="category-list">
      {categories.length > 0 ?
        categories.map(renderCategories)
      :
        <div className="no-category-found">Nenhuma categoria encontrada!</div>}
      </div>
  );
};

export default CategoryList;
