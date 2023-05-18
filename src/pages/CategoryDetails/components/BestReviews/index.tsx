import { VideoType } from "../../../../types/Video";
import { ReviewType } from "../../../../types/Review";
import { Link } from "react-router-dom";


interface BestReviewsProps {
  videos: VideoType[] | undefined;
}

const BestReviews = (props: BestReviewsProps) => {

  const { videos } = props;

  const renderReviews = () => {
    let renderReviews: ReviewType[];
    if(videos) {

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
        {renderReviews()}
      </div>
    </div>
  )
}

export default BestReviews;