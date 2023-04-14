import "./styles.css"
import ReviewCard from "../ReviewCard";

const ReviewContainer = () => {
	return (
		<>
			<h2 className="review-title">Avaliações</h2>
			<div className="main-container flex-column">
				<ReviewCard/>
			</div>
		</>
	)
}

export default ReviewContainer;