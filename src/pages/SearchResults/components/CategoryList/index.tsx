import "./styles.css";
import { MockCategoryList20 } from "../../../../mocks/MockCategoryList20";
import { Category } from "../../../../types/Category";

const CategoryList = () => {
  const renderCategories = (category: Category) => {
    return (
    <a className="category-container">
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
    <div className="category-list">{MockCategoryList20.map(renderCategories)}</div>
  );
};

export default CategoryList;
