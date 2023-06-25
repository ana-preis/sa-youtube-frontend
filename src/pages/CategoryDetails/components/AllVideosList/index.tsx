import { Link } from "react-router-dom";
import './styles.css'
import { VideoType } from "../../../../types/Video";

interface AllVideosListProps {
  videos: VideoType[];
  title?: string;
}

const AllVideosList = (props: AllVideosListProps) => {
  const { videos, title } = props;

  const renderVideos = () => {
    let renderVideos;
    if(videos.length > 0) {
      renderVideos = videos.sort((a,b) => Number(b.averageRating) - Number(a.averageRating));
      return renderVideos.map((video) => {
        return (
            <div className="flex-column">
              <h3 className="title-video-row_details">{video.title}</h3>
              <Link className="a-row_details" to={`/videos/${video.id}`}>
                <img className="img-row_details" src={video.thumbnailUrl} />
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
    <div className="width-100">
      <h2 className="title-row_details">{title ?? "Todos"}</h2>
      <div className="all-videos-row_details">
        {renderVideos()}
      </div>
    </div>
  )
}

export default AllVideosList;