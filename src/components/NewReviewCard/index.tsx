import { useState } from 'react';
import { ReviewType } from '../../types/Review';
import './styles.css'

// interface NewReviewCardProps {
//   review: ReviewType;
// }

const NewReviewCard = () => {
  const[rating, setRating] = useState(0.0);

  // const validateRating = () => {
  //   const input = document.getElementsByClassName('rating-input')
  //   console.log(input)
  //   if (parseFloat(rating)  > 10 || parseFloat(rating) < 0){
  //     console.log('fail')
  //   }
  // }

  return (
    <div className="card flex-row">
			<div className="review flex-column">
				<div className="flex-row review-header">
					<h2 className="user">Nova Avaliação</h2>
				</div>
				<textarea className="text-input" placeholder="Digite aqui sua avaliação" />
			</div>
			<div className="rate-card flex-column">
        Digite uma nota de 1 a 10:
				<input 
          value={rating} 
          className="rating-input" 
          // onChange={validateRating} 
        />
			</div>
		</div>
  )
}

export default NewReviewCard;