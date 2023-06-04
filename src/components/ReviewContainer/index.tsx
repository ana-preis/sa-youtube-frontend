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
		<div className="review-list-container flex-column ai-center">
			<h2 className="review-title">Avaliações</h2>
			{reviewList.length > 0 
        ? 
          reviewList.map(renderReview)
        :
          "Ainda não há avaliações aqui!"}
		</div>
	)
}

export default ReviewContainer;