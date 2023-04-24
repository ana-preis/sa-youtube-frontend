import './styles.css'
import { MockVideoList } from "../../mocks/MockVideoList";
import VideoDetailCard from '../../components/VideoDetailCard';
import VideoColumnCard from '../../components/VideoColumnCard';
import ReviewContainer from '../../components/ReviewContainer';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { ReviewGetType, ReviewType } from '../../types/Review';
import NewReviewCard from '../../components/NewReviewCard';
import { VideoType, VideoGetType } from '../../types/Video';
import { videoTransformer } from '../../helpers/videoTransformer';
import { reviewGetTransformer } from '../../helpers/reviewGetTranformer';

const videoId = "6EI1K4qP8YI";

const initialVideo: VideoType = {
  id: "",
  name: "INITIAL VIDEO",
  url: "",
  publishedAt: "",
  channel: "",
  embedHtml: ""
}

const VideoDetails = () => {
	const [reviewList, setReviewList] = useState<ReviewType[]>([])
	const [showNewReview, setShowNewReview] = useState(false);
  const [video, setVideo] = useState<VideoType>(initialVideo);

	const handleError = () => {
		console.log('erro')
	}

	const handleFetchReview = async () => {
		const response = await api.get<ReviewGetType[]>(`http://localhost:8080/reviews?videoId=${video.id}`)
    const reviewList = response.map((r) => {
      return reviewGetTransformer(r)
    })
		setReviewList(reviewList)
	}

  const handleFetchVideoDetails = async (videoId: string) => {
		const response = await api.get<VideoGetType>(`http://localhost:8080/videos/${videoId}`)
    setVideo(videoTransformer(response))
	}

	useEffect(() => {
    handleFetchVideoDetails(videoId)
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
			<NewReviewCard video={video} />}
			<ReviewContainer reviewList={reviewList}/>
		</>
	)       
}

export default VideoDetails;