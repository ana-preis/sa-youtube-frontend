import { api } from "../api/api"
import { UserAuth } from "../types/User";
import { ResponseType } from "../types/Http"

export const handleLogin = async (email: string, password: string) => {
  const body: UserAuth = { email, password }
  const response = await api.post<string, ResponseType>(`http://localhost:8080/login`, JSON.stringify(body))
  return response;
}

export const handleRevoke = async () => {
  const response = await api.delete(`http://localhost:8080/revoke`, JSON.stringify(""))
  return response;
}