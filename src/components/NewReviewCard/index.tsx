import { useState } from 'react';
import { 
  VideoType
 } from '../../types/Video';
import Button from '../Button';
import './styles.css'

interface NewReviewCardProps {
  video: VideoType;
  onSaveReview: (rating: number | undefined, text: string) => void;
}

const NewReviewCard = ( 
  props : NewReviewCardProps 
  ) => {

  const { video, onSaveReview } = props
  const [rating, setRating] = useState<number>();
  const [reviewText, setReviewText] = useState<string>("");

  return (
    <div className="new-review-main-container">
      <div className="new-review-card">
        <div className="flex-row">
          <div className="review flex-column">
            <div className="flex-row review-header">
              <h2 className="new-review-title">O que você achou do conteúdo?</h2>
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
        <h2 className="new-review-title">Escolha uma categoria para o vídeo:</h2>
        <input className="new-category-input" />
        <span className="optional" >(opcional)</span>
        <Button 
        text="Enviar" 
        className="send-review-btn" 
        onClick={() => onSaveReview(rating, reviewText)}
        />
      </div>
    </div>
  )
}

export default NewReviewCard;