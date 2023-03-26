
import React, {useState} from "react";
import { MockVideoList } from "../../../../mocks/MockVideoList";
import { Video } from "../../../../types/Video";
import './styles.css'

const VideoList = () => {
  const [searchType, setSearchType] = useState<string>('Videos')
  const [searchValue, setSearchValue] = useState<string>('React JS')

  const renderVideoList : any = (video : Video) => {
    return (
      <div className="flex-row video-container">
        <iframe className="video" src={video.url} title="YouTube video player" height="200" width="360" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <div className="flex-column video-text">
          <a className="video-title">{video.name}</a>
          <div className="flex-row video-details">
            <span>{video.viewCount} views</span>
            <span>{video.likeCount} likes</span>
            <span>{video.dislikeCount} dislikes</span>
            <span> Publicado em {video.publishedAt}</span>
          </div>
          <a className="video-channel">{video.channel}</a>
          <span className="video-description">{video.description}</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex-column video-list">
        <span className="list-tip">Mostrando resultados para {searchValue} em {searchType} </span>
        {MockVideoList.map((video) => renderVideoList(video))}
      </div>
    </>
  );
}

export default VideoList;