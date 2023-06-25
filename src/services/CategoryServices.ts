import { api } from "../api/api"
import { CategorySearchType, CategoryType } from "../types/Category"
import { ResponseType } from "../types/Http"
import { UserType } from "../types/User"
import { errors, isResponseError400 } from "./ErrorHandler"
import { updateUser } from "./UserService"

export const handleFetchCategoriesByName = async (text: string | undefined) => {
  const response = await api.get<ResponseType>(`http://localhost:8080/categories?text=${text}`)
  return response;
}

export const handleFetchCategoryByID = async (id: string | undefined) => {
  const response = await api.get<ResponseType>(`http://localhost:8080/categories/${id}`)
  return response;
}

export const handleFetchCategories = async () => {
  const response = await api.get<ResponseType>(`http://localhost:8080/categories`)
  return response;
}

export const handleSaveCategoryToUser = async (userID: string, categoryID: string) => {
  const response = await api.post<string, ResponseType>(`http://localhost:8080/users/${userID}/categories/${categoryID}`, JSON.stringify(""));
  return response;
}

export const handleDeleteCategoryToUser = async (userID: string, categoryID: string) => {
  const response = await api.delete<string, ResponseType>(`http://localhost:8080/users/${userID}/categories/${categoryID}`, JSON.stringify(""));
  return response;
}


export const handleOnClickSubscribe = async (category: CategorySearchType, userState: UserType, setUserState: any) => {
  if (userState && userState.id && userState?.subscriptionsIDs) {
    const list = userState.subscriptionsIDs.filter((c) => {
      return c === category.id
    })
    if (list.length === 0) {
      try {
        const response = await handleSaveCategoryToUser(userState.id, category.id)
        if (!response || isResponseError400(errors.ERR_SUBSCRIBE, response ?? { status: 400, data: null })) return;
        alert("Nova categoria salva com sucesso!")
        await updateUser(setUserState, response.data as UserType)
        return;
      } catch(error) {
        console.error(errors.ERR_SUBSCRIBE, error);
        alert(`${errors.ERR_SUBSCRIBE}${category.name}. error: ${error}`)
        return;
      }
    } else {
      try {
        const response = await handleDeleteCategoryToUser(userState.id, category.id)
        if (!response || isResponseError400(errors.ERR_UNSUBSCRIBE, response ?? { status: 400, data: null })) return;
        alert("Categoria removida do usuario com sucesso!")
        await updateUser(setUserState, response.data as UserType)
        return;
      } catch (error) {
        console.error(errors.ERR_UNSUBSCRIBE, error);
        alert(`${errors.ERR_UNSUBSCRIBE}${category.name}. error: ${error}`)
        return;
      }
    }
  }
}