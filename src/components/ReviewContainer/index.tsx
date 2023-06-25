import "./styles.css"
import ReviewCard from "../ReviewCard";
import { ReviewPostDTO, ReviewSearchType } from "../../types/Review";
import { UserType } from "../../types/User";

interface ReviewContainerProps {
	reviewList: ReviewPostDTO[];
  user: UserType | null;
}

const ReviewContainer = (props: ReviewContainerProps) => {
	const {reviewList, user } = props

	const renderReview = (review : ReviewPostDTO) => {
    let isEditable = false;
    if (user?.role === "ROLE_ADMIN") isEditable = true;
    else if (user?.id === review.userId) isEditable = true;

		return (
			<div className="main-container flex-column">
				<ReviewCard review={review} isEditable={isEditable} />
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