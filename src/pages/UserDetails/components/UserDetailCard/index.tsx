import { useState } from "react";
import Button from "../../../../components/Button";
import { UserOutDTO } from "../../../../types/User";
import '../../styles.css'
import { MockUser } from "../../../../mocks/MockUser";

interface UserDetailCardProps {
  user: UserOutDTO;
  setShowModal:any;
  setUserName: any;
}

const UserDetailCard = (props: UserDetailCardProps) => {

  const [isEditingUserName, setIsEditingUsername] = useState<boolean>(false);
  const { user, setShowModal, setUserName } = props;
  const userMock = MockUser;

  const verifyLength = (value: string, len: number) => {
    if(len === 0) {
      return `Você ainda não tem nenhuma ${value}`
    }
  }

  const handleEdit = () => {
    setIsEditingUsername(true)
  }

  const handleSaveUsername = () => {
    setShowModal(true)
    setIsEditingUsername(false)
  }

  return (
    <div className="flex-column user-container">
      <div className="white-bg">
          <h2 className="user-detail-title">Suas informações:</h2>
          <div className="user-detail_text-container flex-column">
            <div className="flex-row username-edit">
              <div>
                <span className="user-detail_text-title">Username: </span>
                  {isEditingUserName 
                    ? 
                      <input className="input-username" onChange={e => setUserName(e.target.value)}></input>
                    : 
                      <span className="user-detail_text">{userMock.username}</span>
                  }
              </div>
              <Button 
                className="user-detail-edit_button" 
                text={isEditingUserName ? "Salvar" : "Editar username"} 
                onClick={isEditingUserName ? handleSaveUsername : handleEdit}/>
            </div>
            <div>
              <span className="user-detail_text-title">Email: </span>
              <span className="user-detail_text">{userMock.email}</span>
            </div>
            <div>
              <span className="user-detail_text-title">Quantidade de avaliações: </span>
              <span className="user-detail_text">{verifyLength("avaliação", userMock.reviewList?.length ?? 0)}</span>
            </div>
            <div>
              <span className="user-detail_text-title">Categorias inscritas: </span>
              <span className="user-detail_text">{verifyLength("categoria", userMock.categoryList?.length ?? 0)}</span>
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default UserDetailCard;