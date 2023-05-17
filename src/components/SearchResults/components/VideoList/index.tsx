
import { VideoType } from "../../../../types/Video";
import './styles.css'
import { Link } from "react-router-dom";

interface VideoListProps {
  videos: VideoType[];
  text: string | undefined;
  searchType: string | undefined;
}

const VideoList = (props: VideoListProps) => {
  const{ videos, text, searchType } = props;

  const renderVideoList : any = (video : VideoType) => {
    return (
      <div className="flex-row video-container-results ai-center">
        <Link to={`/videos/${video.id}`}>
          <img src={video.thumbnailUrl}></img>  
        </Link>      
        <div className="flex-column video-text_results">
          <a className="video-title_results">{video.title}</a>
          <div className="flex-row video-details_results ai-center">
            <a className="video-channel_results">{video.channelTitle}</a>
            <span className="video-publish_results"> Publicado em {video.publishedAt}</span>
          </div>
          <p className="video-description_results">{video.description}</p>
        </div>
      </div>
    )
  }
  
  const getSuperiorSearchString = () => {
    if(searchType === "videos") return `Mostrando os vídeos contendo "${text}"`
    return `Mostrando as categorias contendo "${text}"`
  }

  return (
    <>
      <div className="flex-column video-list">
        <span className="list-tip">{getSuperiorSearchString()}</span>
        
        { videos ? 
          videos.map((video) => renderVideoList(video))
        :
          <div>erro</div>}
      </div>
    </>
  );
}

export default VideoList;