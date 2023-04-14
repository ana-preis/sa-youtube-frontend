import './styles.css'
import { MockVideoList } from "../../mocks/MockVideoList";
import VideoDetailCard from '../../components/VideoDetailCard';
import VideoColumnCard from '../../components/VideoColumnCard';
import ReviewContainer from '../../components/ReviewContainer';

const VideoDetails = () => {
	const video = MockVideoList[0]

	return (
		<>
			<div className="breadcrumb">
				Breadcrumb - Breadcrumb
			</div>
			<div className="video-detail flex-row">
				<VideoDetailCard video={video}/>
				<VideoColumnCard videoList={MockVideoList} />
			</div>
			<ReviewContainer/>
		</>
	)       
}

export default VideoDetails;