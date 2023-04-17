import { ReactNode } from "react";
import { VideoType } from "../../types/Video";
import "./styles.css"

interface VideoColumnCardProps {
	videoList: VideoType[];
}

const VideoColumnCard = (props : VideoColumnCardProps) => {
	const {videoList} = props;

	const renderVideoList = (video : VideoType ) => {
		return (
			<div className="width-100 flex-column ai-center">
				<img className="video-thumbnail"></img>
				<h3 className="related-video-title">{video.name}</h3>
			</div>
		)
	}

	return (
		<div className="related-videos-container">
			<div className="white-bg flex-column">
				{videoList.slice(0, 3).map((v) => renderVideoList(v))}
			</div>
		</div>
	)
}

export default VideoColumnCard;