import { CategoryType } from "../../../../types/Category";
import './styles.css'

interface CategoryHeaderProps {
  category: CategoryType;
}

const CategoryHeader = (props: CategoryHeaderProps) => {

  const { category } = props;

  return (
    <div className="flex-row">
      <h2 className="title-row_details title-category-name_details">{category.name}</h2>
      <div className="category-description_header">{category.description}</div>  
    </div>
    
  )
}

export default CategoryHeader;
