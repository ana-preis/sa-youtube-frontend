import { api } from "../api/api"
import { UserAuth, TokenAuth } from "../types/User";

export const handleLogin = async (email: string, password: string) => {
  const body: UserAuth = { email, password }
  const response = await api.post<string, TokenAuth>(`http://localhost:8080/login`, JSON.stringify(body))
  return response;
}