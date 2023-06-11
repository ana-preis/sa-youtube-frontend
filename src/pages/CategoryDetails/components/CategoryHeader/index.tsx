import Button from "../../../../components/Button";
import { CategoryType } from "../../../../types/Category";
import './styles.css'

interface CategoryHeaderProps {
  category: CategoryType;
  onSubscribe: () => any;
}

const CategoryHeader = (props: CategoryHeaderProps) => {

  const { category, onSubscribe } = props;

  return (
    <div className="flex-column ai-center">
      <h2 className="title-row_details title-category-name_details">{category.name}</h2>
      <div className="category-description_header">{category.description}</div>  
      <Button className="subscribe-category-btn" text="Inscrever-se" onClick={() => onSubscribe()}/>
    </div>
    
  )
}

export default CategoryHeader;
