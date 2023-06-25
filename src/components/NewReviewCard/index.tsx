import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './styles.css'
import 'react-toastify/dist/ReactToastify.css';
import { handleFetchCategories } from "../../services/CategoryServices";
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import { CategorySearchType } from "../../types/Category";
import { IdNameType, VideoType } from '../../types/Video';

import Button from '../Button';
import DropdownCheckbox from "../DropdownCheckbox";

interface NewReviewCardProps {
	video: VideoType;
	onSaveReview: (rating: number | undefined, text: string, category: string[]) => void;
}

const NewReviewCard = ( props : NewReviewCardProps ) => {
	
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
        setCategoryList(response.data as CategorySearchType[]);
      } catch (error) {
        console.error(errors.ERR_GET_CATEGORIES, error);
        toast.error(`${errors.ERR_GET_CATEGORIES}${error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }
    fetchCategories();
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
							<DropdownCheckbox options={categoryList} setCategory={setCategory} savedCategories={video.categoryIDList as IdNameType[] ?? []}/>
						</>
				}
				<Button 
				text="Enviar" 
				className="send-review-btn" 
				onClick={() => onSaveReview(rating, reviewText, category)}
				/>
			</div>
      <ToastContainer  />
		</div>
	)
}

export default NewReviewCard;