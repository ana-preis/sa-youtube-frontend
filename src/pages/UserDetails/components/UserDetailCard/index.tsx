import { useState } from "react";
import Button from "../../../../components/Button";
import { UserOutDTO } from "../../../../types/User";
import '../../styles.css'

interface UserDetailCardProps {
  user: UserOutDTO;
}

const UserDetailCard = (props: UserDetailCardProps) => {

  // ESSA MERDA AQUI EMBAIXO NAO FUNCIONA
  const [isEditingUserName, setIsEditingUsername] = useState();
  const [userName, setUserName] = useState("")
  const { user } = props;

  const verifyLength = (value: string, len: number) => {
    if(len === 0) {
      return `Você ainda não tem nenhuma ${value}`
    }
  }
  console.log("is editing: ", isEditingUserName)

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
                  <span className="user-detail_text">TEST</span>
                  :
                  <input className="input-username" onChange={e => setUserName(e.target.value)}></input>
                }
              </div>
                <Button className="user-detail-edit_button" text="Editar username" onClick={() => setIsEditingUsername(true)}/>
            </div>
            <div>
              <span className="user-detail_text-title">Email: </span>
              <span className="user-detail_text">{user.email}</span>
            </div>
            <div>
              <span className="user-detail_text-title">Quantidade de avaliações: </span>
              <span className="user-detail_text">{verifyLength("avaliação", user.reviewList?.length ?? 0)}</span>
            </div>
            <div>
              <span className="user-detail_text-title">Categorias nais quais você se inscreve: </span>
              <span className="user-detail_text">{verifyLength("categoria", user.categoryList?.length ?? 0)}</span>
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default UserDetailCard;