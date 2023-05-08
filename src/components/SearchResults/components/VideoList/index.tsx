
import React, {useState} from "react";
import { VideoType } from "../../../../types/Video";
import './styles.css'

interface VideoListProps {
  videos: VideoType[];
}

const VideoList = (props: VideoListProps) => {
  const{ videos } = props;
  const [searchType, setSearchType] = useState<string>('Videos')
  const [searchValue, setSearchValue] = useState<string>('React JS')

  const renderVideoList : any = (video : VideoType) => {
    return (
      <div className="flex-row video-container-results">
        <iframe src={video.url} title="YouTube video player" height="200" width="360" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <div className="flex-column video-text">
          <a className="video-title">{video.title}</a>
          <div className="flex-row video-details">
            <span> Publicado em {video.publishedAt}</span>
          </div>
          <a className="video-channel">{video.channelName}</a>
          <span className="video-description">{video.description}</span>
        </div>
      </div>
    )
  }
  console.log(" dentro do video list, ", videos)

  return (
    <>
      <div className="flex-column video-list">
        <span className="list-tip">Mostrando resultados para {searchValue} em {searchType} </span>
        
        { videos ? 
          videos.map((video) => renderVideoList(video))
        :
          <div>erro</div>}
      </div>
    </>
  );
}

export default VideoList;