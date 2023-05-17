import { api } from "../api/api"
import { UserType, UserOutDTO } from "../types/User";

export const handleSaveNewUser = async (user: UserType) => {
  const response = await api.post<string, UserOutDTO>(`http://localhost:8080/users`, JSON.stringify(user))
  return response;
}