import { Link } from "react-router-dom";
import { VideoType } from "../../../../types/Video";

interface BestRatedListProps {
  videos: VideoType[];
}

const BestRatedList = (props: BestRatedListProps) => {

  const { videos } = props;

  const renderVideos = () => {
    let renderVideos;
    if(videos.length > 0) {
      renderVideos = videos.sort((a,b) => Number(b.averageRating) - Number(a.averageRating));
      renderVideos = renderVideos.slice(0,4);
      return renderVideos.map((video) => {
        return (
          <div className="flex-column">
            <h3 className="title-video-row_details">{video.title}</h3>
            <Link className="a-row_details" to={`/videos/${video.id}`}>
              <img  className="img-row_details" src={video.thumbnailUrl} />
            </Link>
            <div className="row-footer-text_details">Média de avaliações: {video.averageRating}</div>
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
      <h2 className="title-row_details">Mais bem avaliados</h2>
      <div className="flex-row best-rated-row">
        {renderVideos()}
      </div>
    </div>
  )
}

export default BestRatedList;