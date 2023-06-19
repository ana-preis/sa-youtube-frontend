import { resolve } from "path";
import { getCookie, setCookie } from "../services/cookies/CookieService";
import { ResponseType } from "../types/Http";

const getAuthorizationToken = () => {
  const accessToken = getCookie("accessToken")
  if(accessToken && accessToken !== "") return `Bearer ${accessToken}`
  return null
}

export const api = {
    get: <TResponse>(url: string) => 
    request<TResponse>(url, { 
      method: 'GET', 
      headers: { 
        "Content-type": "application/json;charset=UTF-8",
        ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
      },
      mode: 'cors' 
    }),
  
  
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
    request<TResponse>(url, { 
      method: 'POST',
      headers: { 
        "Content-type": "application/json;charset=UTF-8",
        ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
      },
      mode: 'cors',
      body }),
    
  put: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
  request<TResponse>(url, { 
    method: 'PUT',
    headers: { 
      "Content-type": "application/json;charset=UTF-8",
      ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
    },
    mode: 'cors',
    body }),

  delete: (url: string) => 
  request (url, { 
    method: 'DELETE',
    headers: { 
      "Content-type": "application/json;charset=UTF-8",
      ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
    },
    mode: 'cors'
  }),
}

//transformar o response no type
// async function requestWithThen<TResponse>(
//   url: string,
//   config: RequestInit = {}
// ): Promise<TResponse> {
//   return fetch(url, config)
//     .then(response =>  response.json())
//     .then(data => console.log("  api data ", data))
//     .catch(error => {
//       console.log(error);
//       return error;
//     })
// }

// a request retorna vazia do backend no endpoint /m (no postman retorna normal)

async function request<T>(url: string, config: RequestInit): Promise<ResponseType> {
  try {
    const response = await fetch(url, config);
    const status = response.status
    const data = await response.json();
    const result : ResponseType =  {
      status,
      data,
    }
    console.log(" result ", result)
    return result;
  } catch (error) {
    console.log(" error: ", error)
    throw new Error('Erro na requisição HTTP');
  }
}