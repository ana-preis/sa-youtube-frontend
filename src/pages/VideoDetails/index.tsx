import './styles.css'
import { MockVideoList } from "../../mocks/MockVideoList";
import VideoDetailCard from '../../components/VideoDetailCard';
import VideoColumnCard from '../../components/VideoColumnCard';
import ReviewContainer from '../../components/ReviewContainer';
import { useEffect, useState } from 'react';
// import { getVideoByID } from '../../api/backend';
import { fetchReviewByVideoId } from '../../api/review';
import { ReviewType } from '../../types/Review';
import NewReviewCard from '../../components/NewReviewCard';

const VideoDetails = () => {
	const [reviewList, setReviewList] = useState<ReviewType[]>([])
	const [showNewReview, setShowNewReview] = useState(false);

	const video = MockVideoList[0]

	const handleError = () => {
		console.log('erro')
	}

	const handleFetchReview = async () => {
		const response = await fetchReviewByVideoId(video.id)
		console.log(response)
		setReviewList(response)
	}

  // getVideoByID();

	useEffect(() => {
		handleFetchReview()
	},[])

	const renderNewReviewModal = () => {
		setShowNewReview(true)
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
			<NewReviewCard />}
			<ReviewContainer reviewList={reviewList}/>
		</>
	)       
}

export default VideoDetails;