import "./styles.css";
import { CategorySearchType } from "../../../../types/Category";
import { Link } from 'react-router-dom';

interface CategoryListProps {
  categories: CategorySearchType[];
}

const CategoryList = (props: CategoryListProps) => {

  const { categories } = props;

  const renderDescription = (text: string | undefined) => {
    if(text && text.length > 170) {
      text = text.slice(0,170).concat("...")
    }
    return text
  }

  const renderCategories = (category: CategorySearchType) => {
    return (
    <Link to={`/categories/${category.id}`} className="category-results-container flex-column">
      <h2 className="category-title-card">{category.name}</h2>
      <p className="category-description">{renderDescription(category.description)}</p>
      <p className="flex-row card-footer">
      <span className="card-footer-text">{category.userList.length} inscritos</span>
      <span className="card-footer-text">{category.videoList.length} vídeos</span>
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
