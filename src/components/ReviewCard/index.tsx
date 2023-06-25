import "./styles.css"
import { ReviewPostDTO, ReviewSearchType } from "../../types/Review"
import { UserType } from "../../types/User";
import { SetStateAction, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import { useNavigate } from "react-router-dom";
import { handleDeleteReview, handleEditReview } from "../../services/ReviewService";

interface ReviewCardProps {
	review: ReviewPostDTO;
  isEditable: boolean;
}

const ReviewCard = (props : ReviewCardProps) => {
	const { review, isEditable } = props;

  const [isEditingReview, setIsEditingReview] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState<string>(review.text || "");
  const [reviewGrade, setReviewGrade] = useState<number>(review.rating || 0);
  const navigate = useNavigate();

  const toggleEditCard = () => {
    if (isEditingReview) setIsEditingReview(false);
    else setIsEditingReview(true);
  }

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

  const editReview = async () => {
    try {
      const body: ReviewPostDTO = {
        ...review,
        text: reviewText,
        rating: reviewGrade,
        publishedAt: Date.now(),
      }
      const response = await handleEditReview(body)
      if (isResponseError400(errors.ERR_LOGIN, response ?? { status: 400, data: null })) return;
      alert("Avaliação atualizada com sucesso!")
      setIsEditingReview(false)
      window.location.reload();
    } catch (error) {
      console.error(errors.ERR_SAVE_REVIEW, error);
			alert(`${errors.ERR_SAVE_REVIEW}${error}`)
			window.location.reload();
    }
  }

  const deleteReview = async () => {
    try {
      const body: ReviewPostDTO = { ...review }
      const response = await handleDeleteReview(body)
      if (isResponseError400(errors.ERR_LOGIN, response ?? { status: 400, data: null })) return;
      alert("Avaliação excluída!")
      setIsEditingReview(false)
      window.location.reload();
    } catch (error) {
      console.error(errors.ERR_SAVE_REVIEW, error);
			alert(`${errors.ERR_SAVE_REVIEW}${error}`)
			window.location.reload();
    }
  }

	return(
		<div className="card flex-row">
			<div className="review flex-column">
				<div className="flex-row review-header">
					<h2 className="user">{review.username}</h2>
				</div>
        { isEditingReview 
          ?
          <textarea 
						className="text-input" 
						placeholder="Digite aqui sua avaliação" 
						value={reviewText}
						onChange={e => setReviewText(e.target.value)}
						/>
          :
          <div className="review-comment">{review.text}</div>
        }
				<div className="review-footer flex-row">
					{/* <div>Likes</div> */}
				</div>
			</div>
      <div className="flex-column editing-review">
      { isEditingReview
        ?
          <Button text="Editar" className="user-detail-edit_button" onClick={() => editReview()}/>
        :
          <></>
        }
      </div>
			<div className="rate-card flex-column">
				<div className="rate">
					{review.rating}
				</div>
				<div className="flex-row stars">
					{getNumberOfStars(review.rating)}
				</div>
        {isEditable &&
          <div className="flex-row jc-between width-100">
            <a className="edit-btn" onClick={() => toggleEditCard()}>
              <img src="./edit.svg" alt="logo" className="icon-width"></img>
            </a>
            <a className="edit-btn" onClick={() => setShowModal(true)}>
              <img src="./delete.svg" alt="logo" className="icon-width"></img>
            </a>
          </div>
        }
			</div>
      { showModal &&
          <Modal
            title="Deletar avaliação"
            handleOnSave={deleteReview}
            contentText="Você quer deletar essa avaliação?"
            buttonText="Confirmar"
            showModal={setShowModal}
          />
      }
		</div>
	)
}

export default ReviewCard;