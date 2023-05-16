import { api } from "../api/api"
import { reviewFormTransformer } from "../helpers/reviewFormTransformer"
import { reviewGetTransformer } from "../helpers/reviewGetTranformer"
import { ReviewDTO, ReviewSearchType } from "../types/Review"
import { VideoType } from "../types/Video"

export const handleSaveNewReview = async (video: VideoType, newReview: any ) => {
  const body = reviewFormTransformer(video, newReview)
  const response = await api.post<string, ReviewDTO>(`http://localhost:8080/reviews`, JSON.stringify(body))
  return response;
}

export const handleFetchReview = async (videoID: string) => {
		const response = await api.get<ReviewSearchType[]>(`http://localhost:8080/reviews?videoId=${videoID}`)
    return response.map((r) => {
      return reviewGetTransformer(r, videoID)
    })
  }
