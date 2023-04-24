import "./styles.css"
import ReviewCard from "../ReviewCard";
import { ReviewType } from "../../types/Review";

interface ReviewContainerProps {
	reviewList: ReviewType[];
}

const ReviewContainer = (props: ReviewContainerProps) => {
	const {reviewList} = props

	const renderReview = (review : ReviewType) => {
		return (
			<div className="main-container flex-column">
				<ReviewCard review={review}/>
			</div>
		)
	}

	return (
		<>
			<h2 className="review-title">Avaliações</h2>
			{reviewList.map(renderReview)}
		</>
	)
}

export default ReviewContainer;