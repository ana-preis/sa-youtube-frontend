import Button from "../../../../components/Button";
import { CategorySearchType, CategoryType } from "../../../../types/Category";
import { UserType } from "../../../../types/User";
import './styles.css'

interface CategoryHeaderProps {
  category: CategorySearchType;
  onSubscribe: () => any;
  user: UserType | null;
}

const CategoryHeader = (props: CategoryHeaderProps) => {

  const { category, onSubscribe, user } = props;

  const renderSubscribeBtn = () => {
    if(!user) return;
    if (user.subscriptionsIDs?.includes(category.id)) {
      return (
        <>
          <h3>Você está inscrito nessa categoria!</h3>
          <Button className="user-detail-edit_button" text="Desinscrever" onClick={() => onSubscribe()}/>
        </>
      )
    }
    return (
      <Button className="user-detail-edit_button" text="Inscrever-se" onClick={() => onSubscribe()}/>
    )
  }


  return (
    <div className="flex-column ai-center">
      <h2 className="title-row_details title-category-name_details">{category.name}</h2>
      <div className="category-description_header">{category.description}</div>  
      { renderSubscribeBtn() }
    </div>
    
  )
}

export default CategoryHeader;
