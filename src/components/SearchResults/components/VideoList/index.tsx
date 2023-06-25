
import { Link } from "react-router-dom";
import './styles.css'
import { VideoType } from "../../../../types/Video";
import { useEffect, useState } from "react";

interface VideoListProps {
  videos: VideoType[];
  text: string | undefined;
  searchType: string | undefined;
}

const VideoList = (props: VideoListProps) => {
  const{ videos, text, searchType } = props;

  const [videoList, setVideoList] = useState<VideoType[]>();

  useEffect(() => {
    const sortedList = videos.sort((a,b) => (b.averageRating || 0) - (a.averageRating || 0))
    setVideoList(sortedList);
  })


  const getPublishDate = (video: VideoType) => {
    const date = new Date(video.publishedAt);
    return date.toLocaleDateString("pt-BR");
  }

  const renderVideoList : any = (video : VideoType) => {
    return (
      <Link to={`/videos/${video.id}`}>
        <div className="flex-row video-container-results ai-center">
          <img src={video.thumbnailUrl}></img>  
          <div className="flex-column video-text_results">
            <span className="video-title_results">{video.title}</span>
            <div className="flex-row video-details_results ai-center">
              <span className="video-channel_results">{video.channelTitle}</span>
              <span className="video-publish_results">{`Publicado em ${getPublishDate(video)}`}</span>
            </div>
            <p className="video-description_results">{video.description}</p>
          </div>
        </div>
      </Link>
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
        
        { videoList ? 
          videoList.map((video) => renderVideoList(video))
        :
          <div>erro</div>}
      </div>
    </>
  );
}

export default VideoList;