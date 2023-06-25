import { Link } from "react-router-dom";
import { VideoType } from "../../../../types/Video";

interface MostPopularProps {
  videos: VideoType[];
}

const MostPopular = (props: MostPopularProps) => {

  const { videos } = props;

  const renderVideos = () => {
    let renderVideos;
    if(videos.length > 0) {
      renderVideos = videos.sort((a,b) => Number(b.viewCount) - Number(a.viewCount));
      renderVideos = renderVideos.slice(0,4);
      return renderVideos.map((video) => {
        return (
          <div className="flex-column">
            <h3 className="title-video-row_details">{video.title}</h3>
            <Link className="a-row_details" to={`/videos/${video.id}`}>
              <img  className="img-row_details" src={video.thumbnailUrl} />
            </Link>
            <div className="row-footer-text_details">{video.viewCount} views</div>
          </div>
        )
      })
    }
    return (
      <div>
        <h3>Ainda não há vídeos nessa categoria!</h3>
      </div>
    )    
  }

  return (
    <div className="width-100 most-popular-container">
      <h2 className="title-row_details">Mais populares</h2>
      <div className="flex-row best-rated-row">
        {renderVideos()}
      </div>
    </div>
  )
}

export default MostPopular;