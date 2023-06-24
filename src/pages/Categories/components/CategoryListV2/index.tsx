import { CategorySearchType } from "../../../../types/Category";
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import CategoryCard from "../../../../components/CategoryCard";
import { UserType } from "../../../../types/User";
import { handleOnClickSubscribe } from "../../../../services/CategoryServices";

interface CategoryListV2Props {
  categories: CategorySearchType[];
  user: UserType | null;
}

const CategoryListV2 = (props: CategoryListV2Props) => {
  const { categories, user } = props;
  const navigate = useNavigate();
  const handleClickHeart = (category: CategorySearchType) => {
    if(!user) return
    handleOnClickSubscribe(category, user)
    navigate("/")
  }

  const renderCategory = (category: CategorySearchType) => {
    return(
      <CategoryCard category={category} onClickSubscribe={handleClickHeart} />
    )
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