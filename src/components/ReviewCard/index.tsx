import "./styles.css"

const ReviewCard = () => {
	return(
		<div className="card flex-row">
			<div className="review flex-column">
				<div className="flex-row review-header">
					<h2 className="user">UserName</h2>
				</div>
				<div className="review-comment">Comment</div>
				<div className="review-footer flex-row">
					<div>Likes</div>
					<div>Ver mais</div>
				</div>
			</div>
			<div className="rate-card flex-column">
				<div>
					Nota
				</div>
				<div>
					Estrelas
				</div>
			</div>
		</div>
	)
}

export default ReviewCard;