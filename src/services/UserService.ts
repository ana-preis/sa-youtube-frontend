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