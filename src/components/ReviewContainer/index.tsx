import "./styles.css"
import ReviewCard from "../ReviewCard";
import { ReviewSearchType } from "../../types/Review";

interface ReviewContainerProps {
	reviewList: ReviewSearchType[];
}

const ReviewContainer = (props: ReviewContainerProps) => {
	const {reviewList} = props

	const renderReview = (review : ReviewSearchType) => {
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