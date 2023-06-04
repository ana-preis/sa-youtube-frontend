
export const api = {
  get: <TResponse>(url: string) => 
    request<TResponse>(url, { 
      method: 'GET', 
      headers: { "Content-type": "application/json;charset=UTF-8"},
      mode: 'cors' 
    }),
  
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
    request<TResponse>(url, { 
      method: 'POST',
      headers: { "Content-type": "application/json;charset=UTF-8"},
      mode: 'cors',
      body }),
    
  put: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
  request<TResponse>(url, { 
    method: 'PUT',
    headers: { "Content-type": "application/json;charset=UTF-8"},
    mode: 'cors',
    body }),
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