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
        "Accept": "application/json",
        ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
      },
      mode: 'cors' }),
  
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
    request<TResponse>(url, { 
      method: 'POST',
      headers: { 
        "Content-type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
      },
      mode: 'cors',
      body }),
    
  put: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
    request<TResponse>(url, { 
      method: 'PUT',
      headers: { 
        "Content-type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
      },
      mode: 'cors',
      body }),

  patch: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
    request<TResponse>(url, { 
      method: 'PATCH',
      headers: { 
        "Content-type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
      },
      mode: 'cors',
      body }),

  delete: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
    request <TResponse>(url, { 
      method: 'DELETE',
      headers: { 
        "Content-type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        ...(getAuthorizationToken() ? {"Authorization": `${getAuthorizationToken()}`} : {}),
      },
      mode: 'cors',
      body }),
}

async function request<T>(url: string, config: RequestInit): Promise<ResponseType> {
  console.log(" url: ", url)
  console.log(" token: ", getAuthorizationToken())
  const response = await fetch(url, config);
  console.log(" response: ", response)
  const status = response.status
  if (!response.ok) throw new Error(await response.text());
  if (url.includes('login') && status === 400) throw new Error(await response.text())
  if (!url.includes('categories') && config.method === 'DELETE') return { status:204, data:null }
  const data = await response.json();
  console.log("data: ", data)
  const result : ResponseType =  {
    status,
    data,
  }
  return result;
}
