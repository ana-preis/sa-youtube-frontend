import { Link } from "react-router-dom";
import "./styles.css"
import { VideoType } from "../../types/Video";

interface VideoColumnCardProps {
	videoList: VideoType[];
}

const VideoColumnCard = (props : VideoColumnCardProps) => {
	const {videoList} = props;

	const renderVideoList = (video : VideoType ) => {
		return (
			<>
				<Link to={`/videos/${video.id}`} className="video-thumbnail-container">
					<img className="video-thumbnail" src={video.thumbnailUrl}></img>
				</Link>
				<h3 className="related-video-title">{video.title}</h3>
        <hr className="horizontal-related"/>
			</>
		)
	}

	return (
		<div className="related-videos-container">
			<div className="white-bg flex-column">
        <h2 className="related-title">Relacionados</h2>
				{ videoList.length > 0 
          ?        
          videoList.slice(0, 3).map((v) => renderVideoList(v))
          :
          <span className="no-related-videos">Sem videos relacionados</span>
        }
			</div>
		</div>
	)
}

export default VideoColumnCard;