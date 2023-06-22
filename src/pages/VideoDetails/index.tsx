import { useState, useEffect, useContext } from 'react';
import './styles.css'
import { MockVideoList } from "../../mocks/MockVideoList";
import VideoDetailCard from '../../components/VideoDetailCard';
import VideoColumnCard from '../../components/VideoColumnCard';
import ReviewContainer from '../../components/ReviewContainer';
import { ReviewPostDTO, ReviewSearchType } from '../../types/Review';
import NewReviewCard from '../../components/NewReviewCard';
import { VideoType } from '../../types/Video';
import { handleSaveNewReview } from "../../services/ReviewService";
import { useLoaderData, useNavigate } from "react-router-dom";
import { errors } from "../../services/ErrorHandler";
import { handleFetchVideos } from "../../services/VideoServices";
import { UserContext } from "../../layouts/PageBase";
import { ResponseType } from '../../types/Http';

const VideoDetails = () => {

	const navigate = useNavigate();
	const videoLoader: ResponseType = useLoaderData() as ResponseType;
  const videosData = videoLoader.data as VideoType
	const [reviewList] = useState<ReviewSearchType[]>(videosData.reviews ?? [])
	const [showNewReview, setShowNewReview] = useState(false);
  const [video, setVideo] = useState<VideoType>(videosData);
	const [relatedVideos, setRelatedVideos] = useState<VideoType[]>()

	useEffect(() => {
		// console.log(videoLoader.title.split(" ")[5])
		// handleFetchVideos(videoLoader.title.split(" ")[5]).then((response) => {
		// 	setRelatedVideos(response)
		// }).catch(() => {
		// 	handleFetchVideos(videoLoader.channelTitle).then((response) => {
		// 		setRelatedVideos(response)
		// 	})
		// })
	})

	const renderNewReviewModal = () => {
		setShowNewReview(true)
	}

	const handleSaveReview = (rating: number | undefined, text: string, category: string[]) => {
		if (!rating) {
      alert("Preencha o campo da nota!")
      return
    }
    if(rating > 10 || rating < 0) {
      alert("A nota deve ser entre 0 e 10!")
      return
    }
		if(category.length === 0) {
			alert("Deve haver pelo menos uma categoria selecionada!")
      return
		}

    const now = Date.now()

		// GET USER INFO AND POPULATE NEW REQUEST

    const newReview: ReviewPostDTO = {
      rating: Number(rating),
      text,
      userId: "181d4695-6bc6-4958-8528-4a45de31d26f",
      publishedAt: now,
      videoId: video.id,
			categoryIdList: category
    }
		
		handleSaveNewReview(video, newReview)
		.then(() => {
			alert(`Sua avaliação foi enviada :) `)
			window.location.reload();
		}).catch((error) => {
			console.error(errors.ERR_SAVE_REVIEW, error);
			alert(`${errors.ERR_SAVE_REVIEW}${error}`)
			navigate(`/videos/${video.id}`)
		});
	}

	return (
		<>
			<div className="breadcrumb">
				Breadcrumb - Breadcrumb
			</div>
			<div className="video-detail flex-row">
				<VideoDetailCard video={video} renderNewReviewModal={renderNewReviewModal}/>
				<VideoColumnCard videoList={relatedVideos ?? []} />
			</div>
			{showNewReview && 
			<NewReviewCard video={video} onSaveReview={handleSaveReview} />}
			<ReviewContainer reviewList={reviewList}/>
		</>
	)
}

export default VideoDetails;