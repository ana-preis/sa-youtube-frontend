import "./styles.css"
import { ReviewSearchType } from "../../types/Review"

interface ReviewCardProps {
	review: ReviewSearchType;
}

const ReviewCard = (props : ReviewCardProps) => {
	const { review } = props;

	return(
		<div className="card flex-row">
			<div className="review flex-column">
				<div className="flex-row review-header">
					<h2 className="user">{review.userName}</h2>
				</div>
				<div className="review-comment">{review.text}</div>
				<div className="review-footer flex-row">
					<div>Likes</div>
				</div>
			</div>
			<div className="rate-card flex-column">
				<div>
					{review.rating}
				</div>
				<div>
					Estrelas
				</div>
			</div>
		</div>
	)
}

export default ReviewCard;