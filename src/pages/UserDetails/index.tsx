import { useContext, useEffect, useState } from "react";
import { UserOutDTO, UserType, PasswordDTO, UserAuth } from "../../types/User";
import { useLoaderData } from "react-router-dom";
import './styles.css'
import { useNavigate } from "react-router-dom";
import ReviewContainer from "../../components/ReviewContainer";
import UserDetailCard from "./components/UserDetailCard";
import UserCategoriesColumnCard from "./components/UserCategoriesColumnCard";
import Button from "../../components/Button";
import { handleUpdateUser, handleDeleteUser, handleUpdatePassword, updateUser } from "../../services/UserService";
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import Breadcrumbs from "../../components/Breadcrumbs";
import { UserContext } from "../../layouts/PageBase";
import { ResponseType } from "../../types/Http";
import Modal from "../../components/Modal";
import { setCookie } from "../../services/cookies/CookieService";
import { handleFetchCategoryByID } from "../../services/CategoryServices";
import { CategorySearchType } from "../../types/Category";

const UserDetails = () => {

  const context = useContext(UserContext);
  const { 
    userContext
  } = context || {};

  const [userContextState, setUserContextState] = userContext;
  const [categoryList, setCategoryList] = useState<CategorySearchType[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDeleteAccount, setShowModalDeleteAccount] = useState<boolean>(false);
  const [showModalPassword, setShowModalPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const navigate = useNavigate();
  const userLoader: ResponseType = useLoaderData() as ResponseType;
  const user = userLoader.data as UserType;

  const getCategoryList = () => {
    const list: CategorySearchType[] = [];
    user.subscriptionsIDs?.map(async (c) => {
      try {
        const response = await handleFetchCategoryByID(c);
        if (isResponseError400(errors.ERR_GET_CATEGORIES, response)) return;
        list.push(response.data as CategorySearchType);
      } catch (error) {
        console.error(errors.ERR_GET_CATEGORIES, error);
        alert(`${errors.ERR_GET_CATEGORIES}${error}`)
      }
    })
    return list;
  }

  useEffect(() => {
    if(!user) return;
    const resultList = getCategoryList()
    setCategoryList(resultList)
  },[])

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

  const handleDeleteAccount = async () => {
    try {
      const body: UserAuth = {
        username: user.username,
        email: user.email,
        password: password
      }
      const response = await handleDeleteUser(body)
      if (isResponseError400(errors.ERR_DELETE_ACCOUNT, response)) return;
      alert("Conta excluída com sucesso!")
      setCookie("accessToken", "", 7);
      setCookie("refreshToken", "", 7);
      setCookie("userID", "", 7);
      setUserContextState(null);
      setShowModal(false)
      navigate("/");
    } catch (error) {
      console.error(errors.ERR_DELETE_ACCOUNT, error);
			alert(`${errors.ERR_DELETE_ACCOUNT}${error}`)
      window.location.reload();
    }
  }

  const updatePassword = async () => {
    const passwordDTO: PasswordDTO = {
      oldPassword,
      newPassword, 
    }
    console.log(passwordDTO)
    try {
      const response = await handleUpdatePassword(passwordDTO, user.id)
      console.log(response)
      if (isResponseError400(errors.ERR_UPDATE_PASSWORD, response)) return;
      alert("Senha alterada com sucesso!")
      setShowModal(false)
      await updateUser(setUserContextState, response.data as UserType)
      window.location.reload();
    } catch (error) {
      console.error(errors.ERR_UPDATE_PASSWORD, error);
			alert(`${errors.ERR_UPDATE_PASSWORD}${error}`)
      window.location.reload();
    }
  }

	return (
		<>
			<Breadcrumbs />
			<div className="user-detail flex-row">
				<UserDetailCard user={user} setShowModal={setShowModal} setUserName={setUserName} setShowModalPassword={setShowModalPassword}/>
				<UserCategoriesColumnCard categoryList={categoryList ?? []} />
			</div>
			<ReviewContainer reviewList={user.reviewList ?? []}/>
      <Button 
        text="Excluir conta"
        className="delete-account"
        onClick={() => setShowModalDeleteAccount(true)}
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
        {showModalDeleteAccount
          &&
            <Modal
              title="Deletar conta"
              handleOnSave={handleDeleteAccount}
              contentText="Digite sua senha para deletar a sua conta permanentemente:"
              buttonText="Confirmar"
              inputValue={password}
              setInputValue={setPassword}
              showModal={setShowModalDeleteAccount} />
        }
        {showModalPassword
          &&
            <Modal
              title="Alterar senha"
              handleOnSave={updatePassword}
              contentText="Senha antiga:"
              buttonText="Confirmar"
              inputValue={oldPassword}
              setInputValue={setOldPassword}
              showModal={setShowModalPassword}
              secondText="Senha nova:"
              secondInputValue={newPassword}
              setSecondInputValue={setNewPassword} />
        }
		</>
	)
}

export default UserDetails;
