
import {useState} from "react";
import './styles.css'
import { MockPlayList } from "../../../../mocks/MockPlayList20";
import { PlayListType } from "../../../../types/PlayList";

const PlayList = () => {
  const [searchType, setSearchType] = useState<string>('Playlists')
  const [searchValue, setSearchValue] = useState<string>('React JS')

  const renderPlayList : any = (playlist : PlayListType) => {
    return (
      <div className="flex-row video-container-results">
          <iframe className="video" src={playlist.url} title="YouTube video player" height="200" width="360" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
          </iframe>
        <div className="flex-column video-text">
          <a className="video-title">{playlist.name}</a>
          <div className="flex-row video-details">
            <span> Publicado em {playlist.publishedAt}</span>
          </div>
          <a className="video-channel">{playlist.channel}</a>
          <span className="video-description">{playlist.videoList[0]?.title}</span>
          <span className="video-description">{playlist.videoList[1]?.title}</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex-column video-list">
        <span className="list-tip">Mostrando resultados para {searchValue} em {searchType} </span>
        {MockPlayList.map(renderPlayList)}
      </div>
    </>
  );
}

export default PlayList;