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
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import { handleFetchVideos } from "../../services/VideoServices";
import { UserContext } from "../../layouts/PageBase";
import { ResponseType } from '../../types/Http';
import Breadcrumbs from '../../components/Breadcrumbs';

const VideoDetails = () => {

	const navigate = useNavigate();
	const videoLoader: ResponseType = useLoaderData() as ResponseType;
  const videosData = videoLoader.data as VideoType
	const [reviewList] = useState<ReviewSearchType[]>(videosData.reviews ?? [])
	const [showNewReview, setShowNewReview] = useState(false);
  const [video, setVideo] = useState<VideoType>(videosData);
	const [relatedVideos, setRelatedVideos] = useState<VideoType[]>()

  const context = useContext(UserContext);
  const { 
    userContext
  } = context || {};

  const [userState, setUSerState] = userContext;

  const getRelatedVideosByTitle = async () => {
    try {
      const response = await handleFetchVideos(videosData.title.split(" ")[5])
      if (!response && isResponseError400(errors.ERR_SUBSCRIBE, response ?? { status: 400, data: null })) return;
      const relatedVideos = response.data as VideoType[] || []
      if (relatedVideos.length == 0) return;
      relatedVideos.shift();
      setRelatedVideos(relatedVideos)
      return response?.status as number;
    } catch (error) {
      return null;
    }
  }

	useEffect(() => {
    // videos relacionados
    try {
      getRelatedVideosByTitle();
    } catch (error) {
      setRelatedVideos([]);
    }
	},[]);


	const renderNewReviewModal = () => {
		setShowNewReview(true);
	};

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
    const newReview: ReviewPostDTO = {
      rating: Number(rating),
      text,
      userId: userState?.id ?? "",
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
			<Breadcrumbs breadcrumbPage={video.title}></Breadcrumbs>
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