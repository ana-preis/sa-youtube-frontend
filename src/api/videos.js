export const getVideoByID = () => {

  const requestGet = {
    method: 'GET',
    headers: { "Content-type": "application/json;charset=UTF-8"},
    mode: 'cors'
  }

  return fetch('http://localhost:8080/videos/6EI1K4qP8YI', requestGet)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(' Erro de solicitacao', err));
}
