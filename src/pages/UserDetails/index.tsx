import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLoaderData } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import { handleUpdateUser, handleDeleteUser, handleUpdatePassword, updateUser } from "../../services/UserService";
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import { setCookie } from "../../services/cookies/CookieService";
import { handleFetchCategoryByID } from "../../services/CategoryServices";
import { UserType, PasswordDTO, UserAuth } from "../../types/User";
import { ResponseType } from "../../types/Http";
import { CategorySearchType } from "../../types/Category";

import ReviewContainer from "../../components/ReviewContainer";
import UserDetailCard from "./components/UserDetailCard";
import UserCategoriesColumnCard from "./components/UserCategoriesColumnCard";
import Button from "../../components/Button";
import Breadcrumbs from "../../components/Breadcrumbs";
import { UserContext } from "../../layouts/PageBase";
import Modal from "../../components/Modal";

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

  const getCategoryList = async (): Promise<CategorySearchType[]> => {
    const list: CategorySearchType[] = [];
  
    try {
      const responses = await Promise.all(
        user.subscriptionsIDs?.map(async (c) => {
          try {
            const response = await handleFetchCategoryByID(c);
            if (isResponseError400(errors.ERR_GET_CATEGORIES, response)) return null;
            return response.data as CategorySearchType;
          } catch (error) {
            console.error(errors.ERR_GET_CATEGORIES, error);
            toast.error(`${errors.ERR_GET_CATEGORIES}${error}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            return null;
          }
        }) ?? []
      );
  
      list.push(...responses.filter((response): response is CategorySearchType => response !== null));
      return list;
    } catch (error) {
      console.error(errors.ERR_GET_CATEGORIES, error);
      toast.error(`${errors.ERR_GET_CATEGORIES}${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!user) return;
        const result = await getCategoryList();
        setCategoryList(result)
      } catch (error) {
        console.error(errors.ERR_GET_CATEGORIES, error);
        toast.error(`${errors.ERR_GET_CATEGORIES}${error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return [];
      }
    }
    fetchData();
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
      toast.success("Novo username salvo com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setShowModal(false)
      setTimeout(() => window.location.reload(), 3000);
    } catch(error) {
			console.error(errors.ERR_UPDATE_USERNAME, error);
			toast.error(`${errors.ERR_UPDATE_USERNAME}${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setTimeout(() => window.location.reload(), 3000);
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
      toast.success("Conta excluída com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setCookie("accessToken", "", 7);
      setCookie("refreshToken", "", 7);
      setCookie("userID", "", 7);
      setUserContextState(null);
      setShowModal(false)
      navigate("/");
    } catch (error) {
      console.error(errors.ERR_DELETE_ACCOUNT, error);
			toast.error(`${errors.ERR_DELETE_ACCOUNT}${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setTimeout(() => window.location.reload(), 3000);
    }
  }

  const updatePassword = async () => {
    const passwordDTO: PasswordDTO = {
      oldPassword,
      newPassword, 
    }
    try {
      const response = await handleUpdatePassword(passwordDTO, user.id)
      if (isResponseError400(errors.ERR_UPDATE_PASSWORD, response)) return;
      toast.success("Senha alterada com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setShowModal(false)
      await updateUser(setUserContextState, { ...user, password: newPassword })
      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      console.error(errors.ERR_UPDATE_PASSWORD, error);
			toast.error(`${errors.ERR_UPDATE_PASSWORD}${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setTimeout(() => window.location.reload(), 3000);
    }
  }

	return (
		<>
			<Breadcrumbs />
			<div className="user-detail flex-row">
				<UserDetailCard user={user} categoryList={categoryList ?? []} setShowModal={setShowModal} setUserName={setUserName} setShowModalPassword={setShowModalPassword}/>
				<UserCategoriesColumnCard categoryList={categoryList ?? []} />
			</div>
			<ReviewContainer reviewList={user.reviewList ?? []} user={user}/>
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
        <ToastContainer />
		</>
	)
}

export default UserDetails;
