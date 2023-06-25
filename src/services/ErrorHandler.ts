import { ErrorResponse, ResponseType } from "../types/Http";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const errors = {
  ERR_GET_CATEGORIES: "Ocorreu um erro ao obter as categorias: ",
  ERR_SEARCH_VIDEOS_BY_CATEGORY: "Ocorreu um erro ao obter os vídeos pela categoria de id: ",
  ERR_SEARCH_VIDEOS_BY_TEXT: "Ocorreu um erro ao obter os vídeos pelo texto: ",
  ERR_SEARCH_CATEGORIES_BY_TEXT: "Ocorreu um erro ao obter as categorias pelo texto: ",
  ERR_LOGIN: "Ocorreu um erro ao efetuar o login: ",
  ERR_SIGNUP: "Ocorreu um erro ao efetuar o cadastro: ",
  ERR_UPDATE_USERNAME: "Ocorreu um erro ao efetuar a atualização do username: ",
  ERR_UPDATE_PASSWORD: "Ocorreu um erro ao efetuar a atualização da senha: ",
  ERR_DELETE_ACCOUNT: "Ocorreu um erro ao efetuar a exclusão da conta: ",
  ERR_SAVE_REVIEW: "Ocorreu um erro ao registrar uma nova avaliação: ",
  ERR_EDIT_REVIEW: "Ocorreu um erro ao editar a avaliação: ",
  ERR_SUBSCRIBE: "Ocorreu um erro ao se inscrever na categoria: ",
  ERR_UNSUBSCRIBE: "Ocorreu um erro ao remover a inscricao na categoria: ",
}

export const isResponseError400 = (ErrTag: string, response: ResponseType) => {
  if (response.status === 401) {
    console.error(ErrTag, "Nao autorizado");
    toast.error(`${ErrTag} `, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    return true
  }
  if (response.status === 403) {
    console.error(ErrTag, "Proibido");
    toast.error(`${ErrTag} `, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    return true
  }
  if (response.status === 400) {
    const error = response.data as ErrorResponse
    console.error(ErrTag, error.msg);
    toast.error(`${ErrTag}${error.msg}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    return true
  }
}