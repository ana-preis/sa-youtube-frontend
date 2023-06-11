import { api } from "../api/api"
import { UserType, UserOutDTO } from "../types/User";

export const handleSaveNewUser = async (user: UserType) => {
  const response = await api.post<string, UserOutDTO>(`http://localhost:8080/users`, JSON.stringify(user));
  return response;
}

export const handleUpdateUser = async (user: UserType, id: string) => {
  const response = await api.put<string, UserType>(`http://localhost:8080/users/${id}`, JSON.stringify(user));
  return response;
}

export const handleSaveCategoryToUser = async (userID: string, categoryID: string) => {
  const response = await api.post<string, UserType>(`http://localhost:8080/users/${userID}/categories/${categoryID}`, JSON.stringify(""));
  return response;
}

export const handleDeleteCategoryToUser = async (userID: string, categoryID: string) => {
  const response = await api.delete(`http://localhost:8080/users/${userID}/categories/${categoryID}`);
  return response;
}