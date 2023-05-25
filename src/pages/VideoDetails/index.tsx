import { useState } from 'react';
import './styles.css'
import { MockVideoList } from "../../mocks/MockVideoList";
import VideoDetailCard from '../../components/VideoDetailCard';
import VideoColumnCard from '../../components/VideoColumnCard';
import ReviewContainer from '../../components/ReviewContainer';
import { ReviewPostDTO, ReviewSearchType } from '../../types/Review';
import NewReviewCard from '../../components/NewReviewCard';
import { VideoType } from '../../types/Video';
import { handleSaveNewReview } from "../../services/ReviewService";
import { useLoaderData } from "react-router-dom";

const VideoDetails = () => {
	const videoLoader: VideoType = useLoaderData() as VideoType;
	const [reviewList] = useState<ReviewSearchType[]>(videoLoader.reviews ?? [])
	const [showNewReview, setShowNewReview] = useState(false);
  const [video, setVideo] = useState<VideoType>(videoLoader);


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

    const now = Date.now()

		// GET USER INFO AND POPULATE NEW REQUEST

    const newReview: ReviewPostDTO = {
      rating: Number(rating),
      text,
      userId: "d2e83590-fb49-47b1-a301-027c0b5657bd",
      publishedAt: now,
      videoId: video.id,
			categoryIdList: category
    }
		handleSaveNewReview(video, newReview).then((response) => {
			alert(`Sua avaliação foi enviada :) `)
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