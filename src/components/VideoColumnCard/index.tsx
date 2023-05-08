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
			<>
				<a className="width-100 flex-column ai-center video-thumbnail-container">
					<img className="video-thumbnail" src={video.thumbnail}></img>
				</a>
				<h3 className="related-video-title">{video.title}</h3>
			</>
		)
	}

	return (
		<div className="related-videos-container">
			<div className="white-bg flex-column">
        <h2 className="related-title">Relacionados</h2>
				{videoList.slice(0, 3).map((v) => renderVideoList(v))}
			</div>
		</div>
	)
}

export default VideoColumnCard;