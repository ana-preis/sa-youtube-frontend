import { useUser } from "../layouts/PageBase";

const { accessToken } = useUser();

export const api = {
  get: <TResponse>(url: string) => 
    request<TResponse>(url, { 
      method: 'GET', 
      headers: { 
        "Content-type": "application/json;charset=UTF-8",
        "Authentication": `Bearer ${accessToken}`
      },
      mode: 'cors' 
    }),
  
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
    request<TResponse>(url, { 
      method: 'POST',
      headers: { 
        "Content-type": "application/json;charset=UTF-8",
        "Authentication": `Bearer ${accessToken}`
      },
      mode: 'cors',
      body }),
    
  put: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
  request<TResponse>(url, { 
    method: 'PUT',
    headers: { 
      "Content-type": "application/json;charset=UTF-8",
      "Authentication": `Bearer ${accessToken}`
    },
    mode: 'cors',
    body }),

  delete: (url: string) => 
  request (url, { 
    method: 'DELETE',
    headers: { 
      "Content-type": "application/json;charset=UTF-8",
      "Authentication": `Bearer ${accessToken}`
    },
    mode: 'cors'
  }),
}

async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.log(error);
    })
}