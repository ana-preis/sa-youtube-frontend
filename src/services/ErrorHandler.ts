import { ErrorResponse, ResponseType } from "../types/Http";

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
  ERR_SUBSCRIBE: "Ocorreu um erro ao se inscrever na categoria: ",
  ERR_UNSUBSCRIBE: "Ocorreu um erro ao remover a inscricao na categoria: "
}

export const isResponseError400 = (ErrTag: string, response: ResponseType) => {
  if (response.status === 401) {
    console.error(ErrTag, "Nao autorizado");
    alert(`${ErrTag} `)
    return true
  }
  if (response.status === 403) {
    console.error(ErrTag, "Proibido");
    alert(`${ErrTag} `)
    return true
  }
  if (response.status === 400) {
    const error = response.data as ErrorResponse
    console.error(ErrTag, error.msg);
    alert(`${ErrTag}${error.msg}`)
    return true
  }
}