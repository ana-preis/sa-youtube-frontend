import { api } from "../api/api"
import { UserType, UserAuth, PasswordDTO } from "../types/User";
import { ResponseType } from "../types/Http"
import { errors, isResponseError400 } from "./ErrorHandler";
import { setCookie } from "./cookies/CookieService";

export const handleSaveNewUser = async (user: UserAuth) => {
    const response = await api.post<string, ResponseType>(`http://localhost:8080/users`, JSON.stringify(user));
    return response;
}

export const handleUpdateUser = async (user: UserType, id: string) => {
  const response = await api.patch<string, ResponseType>(`http://localhost:8080/users/${id}`, JSON.stringify(user));
  return response;
}

export const handleUpdatePassword = async (user: PasswordDTO, id: string) => {
  const response = await api.patch<string, ResponseType>(`http://localhost:8080/users/${id}/password`, JSON.stringify(user));
  return response;
}

export const handleDeleteUser = async (user: UserAuth) => {
  const response = await api.delete<string, ResponseType>(`http://localhost:8080/users`, JSON.stringify(user));
  return response;
}

export const handleMe = async () => {
  const response = await api.get<ResponseType>(`http://localhost:8080/me`);
  return response;
}

export const updateUser = async (setUserState: any, user: UserType) => {
      setUserState(user);
      setCookie("userID", user.id, 7);

}
