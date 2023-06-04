import { useState, useEffect } from 'react';
import { handleFetchCategories } from "../../services/CategoryServices";
import { CategoryType } from "../../types/Category";
import { 
	VideoType
 } from '../../types/Video';
import Button from '../Button';
import DropdownCheckbox from "../DropdownCheckbox";
import './styles.css'

interface NewReviewCardProps {
	video: VideoType;
	onSaveReview: (rating: number | undefined, text: string, category: string[]) => void;
}

const NewReviewCard = ( props : NewReviewCardProps ) => {
	const { video, onSaveReview } = props
	const [rating, setRating] = useState<number>();
	const [reviewText, setReviewText] = useState<string>("");
	const [category, setCategory] = useState<string[]>([])
	const [categoryList, setCategoryList] = useState<CategoryType[]>([])

	useEffect(() => {
    handleFetchCategories().then((v) => {
			if(v) setCategoryList(v)
    })
  },[])

	return (
		<div className="new-review-main-container">
			<div className="new-review-card">
				<div className="flex-row">
					<div className="review flex-column">
						<div className="flex-row review-header">
							<h2 className="new-review-title">O que você achou do conteúdo?</h2>
						</div>
						<textarea 
						className="text-input" 
						placeholder="Digite aqui sua avaliação" 
						value={reviewText}
						onChange={e => setReviewText(e.target.value)}
						/>
					</div>
					<div className="new-rate-card flex-column">
						Digite uma nota de 0 a 10:
						<div className="input-div">
							<input 
								value={rating}
								type="number" 
								min="0" 
								max="10"
								id="rating"
								className="new-rate-input"
								onChange={e => setRating(Number(e.target.value))}
							/>
						</div>
					</div>
				</div>
				{
					(categoryList.length > 0) &&
						<>
							<h2 className="new-review-title">Escolha uma categoria para o vídeo:</h2>
							<DropdownCheckbox options={categoryList} setCategory={setCategory} savedCategories={video.categoryIDList ?? []}/>
						</>
				}
				<Button 
				text="Enviar" 
				className="send-review-btn" 
				onClick={() => onSaveReview(rating, reviewText, category)}
				/>
			</div>
		</div>
	)
}

export default NewReviewCard;