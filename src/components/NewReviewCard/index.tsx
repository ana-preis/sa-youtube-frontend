import { useState } from 'react';
import { reviewFormTransformer } from '../../helpers/reviewFormTransformer';
import { 
  ReviewDTO 
} from '../../types/Review';
import { 
  VideoType
 } from '../../types/Video';
import Button from '../Button';
import './styles.css'
import { api } from '../../api/api';

// user ID : d2e83590-fb49-47b1-a301-027c0b5657bd

interface NewReviewCardProps {
  video: VideoType;
}

const NewReviewCard = ( 
  props : NewReviewCardProps 
  ) => {

  const { video } = props
  const [rating, setRating] = useState<number>();
  const [reviewText, setReviewText] = useState<string>("");

  const handleSendNewReview = async () => {
    if (!rating) {
      alert("Preencha o campo da nota!")
      return
    }

    const now = Date.now()
    const newReview = {
      "rating": Number(rating),
      "text": reviewText,
      "userID": "d2e83590-fb49-47b1-a301-027c0b5657bd",
      "user": "Ana Preis",
      "publishedAt": now.toString(),
      "videoId": video.id,
    }
    const body = reviewFormTransformer(video, newReview)
    const response = await api.post<string, ReviewDTO>(`http://localhost:8080/reviews`, JSON.stringify(body))
    alert(`Sucesso ${response.userID}, sua nota foi enviada :) `)
    window.location.reload();
  }

  return (
    <div className="new-review-main-container">
      <div className="new-review-card">
        <div className="flex-row">
          <div className="review flex-column">
            <div className="flex-row review-header">
              <h2 className="new-review-title">O que voce achou do conteudo?</h2>
            </div>
            <textarea 
            className="text-input" 
            placeholder="Digite aqui sua avaliação" 
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            />
          </div>
          <div className="new-rate-card flex-column">
            Digite uma nota de 0 a 10:
            <div className="input-div">
              <input 
                value={rating}
                type="number" 
                min="0" 
                max="10"
                id="rating"
                className="new-rate-input"
                onChange={e => setRating(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <h2 className="new-review-title">Escolha uma categoria para o video:</h2>
        <input className="new-category-input" />
        <span className="optional" >(opcional)</span>
        <Button 
        text="Enviar" 
        className="send-review-btn" 
        onClick={handleSendNewReview}
        />
      </div>
    </div>
  )
}

export default NewReviewCard;