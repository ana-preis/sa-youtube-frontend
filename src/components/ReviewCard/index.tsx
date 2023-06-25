import "./styles.css"
import { ReviewSearchType } from "../../types/Review"

interface ReviewCardProps {
	review: ReviewSearchType;
}

const ReviewCard = (props : ReviewCardProps) => {
	const { review } = props;

	const getNumberOfStars = (rate: number | undefined) => {
		if (!rate) return (<div></div>);
		const emptyStar = <img src="./emptystar.svg" alt="star" className="star" />;
		const fullStar = <img src="./star.svg" alt="star" className="star" />;
		const halfStar = <img src="./halfstar.svg" alt="star" className="star" />;
		const emptyStars = [emptyStar, emptyStar, emptyStar, emptyStar, emptyStar];
		const halfValue = Math.round(rate) / 2;
		let finalIndex = 0;

		for (let i = 0; i < Math.floor(halfValue); i++) {
			emptyStars[i] = fullStar;
			finalIndex = i + 1;
		}
		if (halfValue !== Math.floor(halfValue)) {
			emptyStars[finalIndex] = halfStar;
		}
		return emptyStars;
	}
	return(
		<div className="card flex-row">
			<div className="review flex-column">
				<div className="flex-row review-header">
					<h2 className="user">{review.username}</h2>
				</div>
				<div className="review-comment">{review.text}</div>
				<div className="review-footer flex-row">
					{/* <div>Likes</div> */}
				</div>
			</div>
			<div className="rate-card flex-column">
				<div className="rate">
					{review.rating}
				</div>
				<div className="flex-row stars">
					{getNumberOfStars(review.rating)}
				</div>
			</div>
		</div>
	)
}

export default ReviewCard;