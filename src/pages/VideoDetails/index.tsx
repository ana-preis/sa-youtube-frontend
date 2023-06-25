import { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLoaderData, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import { handleSaveNewReview } from "../../services/ReviewService";
import { errors, isResponseError400 } from "../../services/ErrorHandler";
import { handleFetchVideos } from "../../services/VideoServices";
import { ReviewPostDTO } from '../../types/Review';
import { VideoType } from '../../types/Video';
import { ResponseType } from '../../types/Http';

import { UserContext } from "../../layouts/PageBase";
import VideoDetailCard from '../../components/VideoDetailCard';
import VideoColumnCard from '../../components/VideoColumnCard';
import ReviewContainer from '../../components/ReviewContainer';
import NewReviewCard from '../../components/NewReviewCard';
import Breadcrumbs from '../../components/Breadcrumbs';

const VideoDetails = () => {

	const navigate = useNavigate();
	const videoLoader: ResponseType = useLoaderData() as ResponseType;
  const videosData = videoLoader.data as VideoType
	const [reviewList] = useState<ReviewPostDTO[]>(videosData.reviews ?? [])
	const [showNewReview, setShowNewReview] = useState(false);
  const [video, setVideo] = useState<VideoType>(videosData);
	const [relatedVideos, setRelatedVideos] = useState<VideoType[]>()
  console.log("response: ", videosData)
  const context = useContext(UserContext);
  const { 
    userContext
  } = context || {};

  const [userState, setUSerState] = userContext;

  const getRelatedVideosByTitle = async () => {
    try {
      const response = await handleFetchVideos(videosData.title.split(" ")[5])
      if (!response || isResponseError400(errors.ERR_SUBSCRIBE, response ?? { status: 400, data: null })) return;
      const relatedVideos = response.data as VideoType[] || []
      if (relatedVideos.length == 0) return;
      relatedVideos.shift();
      setRelatedVideos(relatedVideos)
      return response?.status as number;
    } catch (error) {
      return null;
    }
  }

	// useEffect(() => {
  //   // videos relacionados
  //   try {
  //     getRelatedVideosByTitle();
  //   } catch (error) {
  //     setRelatedVideos([]);
  //   }
	// },[]);

	const renderNewReviewModal = () => {
		setShowNewReview(true);
	};

	const handleSaveReview = (rating: number | undefined, text: string, category: string[]) => {
		if (!rating) {
      toast.info("Preencha o campo da nota!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      return
    }
    if(rating > 10 || rating < 0) {
      toast.info("A nota deve ser entre 0 e 10!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      return
    }
		if(category.length === 0) {
			toast.info("Deve haver pelo menos uma categoria selecionada!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      return
		}

    const now = Date.now()
    const newReview: ReviewPostDTO = {
      rating: Number(rating),
      text,
      userId: userState?.id ?? "",
      publishedAt: now,
      videoId: video.id,
			categoryIdList: category,
      username: userState?.username ?? "",
    }
		
		handleSaveNewReview(video, newReview)
		.then(() => {
			toast(`Sua avaliação foi enviada :) `, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
			setTimeout(() => window.location.reload(), 3000);
		}).catch((error) => {
			console.error(errors.ERR_SAVE_REVIEW, error);
			toast.error(`${errors.ERR_SAVE_REVIEW}${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setTimeout(() => navigate(`/videos/${video.id}`), 3000);
		});
	}

	return (
		<>
			<Breadcrumbs breadcrumbPage={video.title}></Breadcrumbs>
			<div className="video-detail flex-row">
				<VideoDetailCard user={userState} video={video} renderNewReviewModal={renderNewReviewModal}/>
				<VideoColumnCard videoList={relatedVideos ?? []} />
			</div>
			{showNewReview && 
			<NewReviewCard video={video} onSaveReview={handleSaveReview} />}
			<ReviewContainer reviewList={reviewList} user={userState}/>
      <ToastContainer />
		</>
	)
}

export default VideoDetails;