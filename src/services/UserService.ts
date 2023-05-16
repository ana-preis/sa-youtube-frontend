import { api } from "../api/api"
import { UserType } from "../types/User";

export const handleSaveNewUser = async (user: UserType) => {
  const response = await api.post<string, UserType>(`http://localhost:8080/users`, JSON.stringify(user))
  return response;
}