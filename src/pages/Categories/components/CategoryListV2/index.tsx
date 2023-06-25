import { CategorySearchType } from "../../../../types/Category";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import CategoryCard from "../../../../components/CategoryCard";
import { UserType } from "../../../../types/User";
import { handleOnClickSubscribe } from "../../../../services/CategoryServices";

interface CategoryListV2Props {
  categories: CategorySearchType[];
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const CategoryListV2 = (props: CategoryListV2Props) => {
  const { categories, user, setUser } = props;
  const navigate = useNavigate();

  const handleClickHeart = async (category: CategorySearchType) => {
    if(!user) return;
    await handleOnClickSubscribe(category, user, setUser)
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
      <ToastContainer />
    </div>
  );
}

export default CategoryListV2;