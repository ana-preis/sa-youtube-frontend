import { useEffect, useState } from 'react';
import './styles.css'
import { MockVideoList } from "../../mocks/MockVideoList";
import VideoDetailCard from '../../components/VideoDetailCard';
import VideoColumnCard from '../../components/VideoColumnCard';
import ReviewContainer from '../../components/ReviewContainer';
import { ReviewType } from '../../types/Review';
import NewReviewCard from '../../components/NewReviewCard';
import { VideoType } from '../../types/Video';
import { handleSaveNewReview, handleFetchReview } from "../../services/ReviewService";
import { useLoaderData } from "react-router-dom";

const VideoDetails = () => {
	const videoLoader: VideoType = useLoaderData() as VideoType;
	const [reviewList, setReviewList] = useState<ReviewType[]>([])
	const [showNewReview, setShowNewReview] = useState(false);
  const [video, setVideo] = useState<VideoType>(videoLoader);

	useEffect(() => {
		handleFetchReview(video.id).then((reviewList) => setReviewList(reviewList))
	},[])

	const renderNewReviewModal = () => {
		setShowNewReview(true)
	}

	const handleSaveReview = (rating: number | undefined, text: string) => {
		if (!rating) {
      alert("Preencha o campo da nota!")
      return
    }
    if(rating > 10 || rating < 0) {
      alert("A nota deve ser entre 0 e 10!")
      return
    }

    const now = Date.now()
    const newReview = {
      "rating": Number(rating),
      "text": text,
      "userID": "d2e83590-fb49-47b1-a301-027c0b5657bd",
      "user": "Ana Preis",
      "publishedAt": now.toString(),
      "videoId": video.id,
    }
		handleSaveNewReview(video, newReview).then((response) => {
			alert(`Sucesso ${response.userID}, sua nota foi enviada :) `)
			window.location.reload();
		})
	}

	return (
		<>
			<div className="breadcrumb">
				Breadcrumb - Breadcrumb
			</div>
			<div className="video-detail flex-row">
				<VideoDetailCard video={video} renderNewReviewModal={renderNewReviewModal}/>
				<VideoColumnCard videoList={MockVideoList} />
			</div>
			{showNewReview && 
			<NewReviewCard video={video} onSaveReview={handleSaveReview} />}
			<ReviewContainer reviewList={reviewList}/>
		</>
	)
}

export default VideoDetails;