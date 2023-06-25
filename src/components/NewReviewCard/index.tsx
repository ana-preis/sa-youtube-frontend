import { useState, useEffect } from 'react';
import { handleFetchCategories } from "../../services/CategoryServices";
import { CategorySearchType, CategoryType } from "../../types/Category";
import { VideoType } from '../../types/Video';
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import Button from '../Button';
import DropdownCheckbox from "../DropdownCheckbox";
import { useNavigate } from "react-router-dom";
import './styles.css'

interface NewReviewCardProps {
	video: VideoType;
	onSaveReview: (rating: number | undefined, text: string, category: string[]) => void;
}

const NewReviewCard = ( props : NewReviewCardProps ) => {
	
	const navigate = useNavigate();
	const { video, onSaveReview } = props
	const [rating, setRating] = useState<number>();
	const [reviewText, setReviewText] = useState<string>("");
	const [category, setCategory] = useState<string[]>([])
	const [categoryList, setCategoryList] = useState<CategorySearchType[]>([])

	useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await handleFetchCategories();
        if (!response || isResponseError400(errors.ERR_LOGIN, response ?? { status: 400, data: null })) return;
        console.log(" response: ", response);
        setCategoryList(response.data as CategorySearchType[]);
      } catch (error) {
        console.error(errors.ERR_GET_CATEGORIES, error);
        alert(`${errors.ERR_GET_CATEGORIES}${error}`);
        return;
      }
    }
    fetchCategories();
  },[])
  console.log(" category list: ", categoryList)

	return (
		<div className="new-review-main-container">
			<div className="new-review-card">
				<div className="flex-row">
					<div className="review flex-column">
						<div className="flex-row review-header">
							<h2 className="new-review-title">O que você achou do conteúdo?</h2>
						</div>
						<textarea 
						className="text-input text-input-new" 
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