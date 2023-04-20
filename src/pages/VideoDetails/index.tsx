import './styles.css'
import { MockVideoList } from "../../mocks/MockVideoList";
import VideoDetailCard from '../../components/VideoDetailCard';
import VideoColumnCard from '../../components/VideoColumnCard';
import ReviewContainer from '../../components/ReviewContainer';
import { useEffect, useState } from 'react';
// import { getVideoByID } from '../../api/backend';
import { fetchReviewByVideoId } from '../../api/review';
import { ReviewType } from '../../types/Review';

const VideoDetails = () => {
	const[reviewList, setReviewList] = useState<ReviewType[]>([])

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

	return (
		<>
			<div className="breadcrumb">
				Breadcrumb - Breadcrumb
			</div>
			<div className="video-detail flex-row">
				<VideoDetailCard video={video}/>
				<VideoColumnCard videoList={MockVideoList} />
			</div>
			<ReviewContainer reviews={reviewList}/>
		</>
	)       
}

export default VideoDetails;