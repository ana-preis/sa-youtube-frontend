import { useContext, useState } from "react";
import { UserOutDTO, UserType } from "../../types/User";
import { useLoaderData } from "react-router-dom";
import './styles.css'
import { useNavigate } from "react-router-dom";
import ReviewContainer from "../../components/ReviewContainer";
import UserDetailCard from "./components/UserDetailCard";
import UserCategoriesColumnCard from "./components/UserCategoriesColumnCard";
import Button from "../../components/Button";
import { handleUpdateUser } from "../../services/UserService";
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import Breadcrumbs from "../../components/Breadcrumbs";
import { UserContext } from "../../layouts/PageBase";
import { ResponseType } from "../../types/Http";
import Modal from "../../components/Modal";

const UserDetails = () => {
  
  const [showModal, setShowModal] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const userLoader: ResponseType = useLoaderData() as ResponseType;
  const user = userLoader.data as UserOutDTO;

  const handleSaveUser = async () => {
    
    const userInDTO: UserType = {
      id: user.id,
      email: user.email,
      username: userName,
      password: password
    }
    try {
      const response = await handleUpdateUser(userInDTO, user.id)
      if (isResponseError400(errors.ERR_LOGIN, response)) return;
      alert("Novo username salvo com sucesso!")
      setShowModal(false)
      window.location.reload();
    } catch(error) {
			console.error(errors.ERR_UPDATE_USERNAME, error);
			alert(`${errors.ERR_UPDATE_USERNAME}${error}`)
      window.location.reload();
		}
  }

  const handleDeleteAccount = () => {

  }

  console.log(" show modal: ", showModal)

	return (
		<>
			<Breadcrumbs />
			<div className="user-detail flex-row">
				<UserDetailCard user={user} setShowModal={setShowModal} setUserName={setUserName}/>
				<UserCategoriesColumnCard categoryList={user.categoryList ?? []} />
			</div>
			<ReviewContainer reviewList={user.reviewList ?? []}/>
      <Button 
        text="Excluir conta"
        className="delete-account"
        onClick={() => handleDeleteAccount()}
        />
      {showModal 
        &&
          <Modal
            title="Troca de username"
            handleOnSave={handleSaveUser}
            contentText="Digite sua senha para confirmar a mudança do seu username:"
            buttonText="Salvar"
            inputValue={password}
            setInputValue={setPassword}
            showModal={setShowModal} />
        }
		</>
	)
}

export default UserDetails;


// <div className="modal-container">
//             <div className="modal-save-user flex-column ai-center">
//               <h2 className="modal-header">Troca de username</h2>
//               <div className="modal-content flex-column ai-center">
//                 <p>
//                   Digite sua senha para confirmar a mudança do seu username:
//                 </p>
//                 <div className="flex-row">
//                   <input className="input-username modal-input" type={inputType} onChange={(e) => setPassword(e.target.value)} value={password}></input>
//                   <a onClick={() => toggleInputType()}>
//                     <img src="./eye.svg" alt="show-password"/>  
//                   </a>
//                 </div>
//                 <Button text="Salvar" className="user-detail-edit_button" onClick={handleSaveUser}/>
//               </div>
//             </div>
//           </div> 