import { api } from "../api/api"
import { UserType, UserAuth } from "../types/User";
import { ResponseType } from "../types/Http"

export const handleSaveNewUser = async (user: UserAuth) => {
    const response = await api.post<string, ResponseType>(`http://localhost:8080/users`, JSON.stringify(user));
    return response;
}

export const handleUpdateUser = async (user: UserType, id: string) => {
  const response = await api.put<string, ResponseType>(`http://localhost:8080/users/${id}`, JSON.stringify(user));
  return response;
}

export const handleSaveCategoryToUser = async (userID: string, categoryID: string) => {
  const response = await api.post<string, ResponseType>(`http://localhost:8080/users/${userID}/categories/${categoryID}`, JSON.stringify(""));
  return response;
}

export const handleDeleteCategoryToUser = async (userID: string, categoryID: string) => {
  const response = await api.delete(`http://localhost:8080/users/${userID}/categories/${categoryID}`);
  return response;
}

export const handleMe = async () => {
  const response = await api.get<ResponseType>(`http://localhost:8080/me`);
  return response;
}