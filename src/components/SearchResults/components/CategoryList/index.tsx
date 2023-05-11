import "./styles.css";
import { CategoryType } from "../../../../types/Category";
import { Link } from 'react-router-dom';

interface CategoryListProps {
  categories: CategoryType[];
}

const CategoryList = (props: CategoryListProps) => {

  const { categories } = props;

  const renderCategories = (category: CategoryType) => {
    return (
    <Link to={`/categories/${category.id}`} className="category-results-container">
      <h2 className="category-title-card">{category.name}</h2>
      <p className="category-description">{category.description}</p>
      <p className="flex-row card-footer">
      <span className="card-footer-text">{category.userCount} inscritos</span>
      <span className="card-footer-text">{category.videoCount} vídeos</span>
      </p>
    </Link>
    );
  };

  return (
    <div className="category-list">
      {categories !== undefined && categories.length > 0 ? 
        categories.map(renderCategories)
      :
        <div className="no-category-found">Nenhuma categoria encontrada!</div>}
      </div>
  );
};

export default CategoryList;
