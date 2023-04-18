import { ReviewType } from "../types/Review";
import { RequestInit } from "../types/Http";

export async function fetchReviewByVideoId(videoId: string): Promise<ReviewType[]> {

  const requestGet: RequestInit = {
    method: 'GET',
    headers: { "Content-type": "application/json;charset=UTF-8"},
    mode: 'cors'
  }

  try {
    const res = await fetch('http://localhost:8080/reviews/6EI1K4qP8YI', requestGet);
    console.log(res.json());
    return await await res.json();
  } catch (err) {
    console.log(' Erro de solicitacao', err);
    return [];
  }
}
