import { useState } from "react";
import { UserOutDTO, UserType } from "../../types/User";
import { useLoaderData } from "react-router-dom";
import './styles.css'
import { redirect } from "react-router-dom";
import ReviewContainer from "../../components/ReviewContainer";
import UserDetailCard from "./components/UserDetailCard";
import UserCategoriesColumnCard from "./components/UserCategoriesColumnCard";
import Button from "../../components/Button";
import { handleUpdateUser } from "../../services/UserService";
import { errors } from "../../services/ErrorHandler";
import Breadcrumbs from "../../components/Breadcrumbs";

const UserDetails = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const userLoader: UserOutDTO = useLoaderData() as UserOutDTO;

  const handleSaveUser = () => {
    const userInDTO: UserType = {
      id: userLoader.id,
      email: userLoader.email,
      username: userName,
      password: password
    }
    // checkpassword
    // if(password !== userLoader) return alert("senha incorreta!")
    handleUpdateUser(userInDTO, userLoader.id)
    .then((r) => {
      alert("Novo username salvo com sucesso!")
      setShowModal(false)
      redirect(`/users/1`)
    }).catch((error) => {
			console.error(errors.ERR_UPDATE_USERNAME, error);
			alert(`${errors.ERR_UPDATE_USERNAME}${error}`)
		});
  }

	return (
		<>
			<Breadcrumbs />
			<div className="user-detail flex-row">
				<UserDetailCard user={userLoader} setShowModal={setShowModal} setUserName={setUserName}/>
				<UserCategoriesColumnCard caetgoryList={userLoader.categoryList ?? []} />
			</div>
			<ReviewContainer reviewList={userLoader.reviewList ?? []}/>
      {showModal 
        &&
          <div className="modal-container">
            <div className="modal-save-user flex-column ai-center">
              <h2 className="modal-header">Troca de username</h2>
              <div className="modal-content flex-column ai-center">
                <p>
                  Digite sua senha para confirmar a mudança do seu username:
                </p>
                <input className="input-username modal-input" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <Button text="Salvar" className="user-detail-edit_button" onClick={handleSaveUser}/>
              </div>
            </div>
          </div> 
        }
		</>
	)
}

export default UserDetails;