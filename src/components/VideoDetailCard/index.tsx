import "./styles.css";
import { VideoType } from "../../types/Video";
import { UserType } from "../../types/User";
import Button from "../../components/Button";

interface VideoDetailCardProps {
	video: VideoType;
  renderNewReviewModal: () => void;
  user: UserType | null;
}

const VideoDetailCard = (props: VideoDetailCardProps) => {
	const {video, renderNewReviewModal, user } = props;

	const getNumberOfStars = (rate: number | undefined) => {
		if (!rate) return (<div></div>);
		const emptyStar = <img src="./emptystar.svg" alt="star" className="star" />;
		const fullStar = <img src="./star.svg" alt="star" className="star" />;
		const halfStar = <img src="./halfstar.svg" alt="star" className="star" />;
		const emptyStars = [emptyStar, emptyStar, emptyStar, emptyStar, emptyStar];
		const halfValue = Math.round(rate) / 2;
		let finalIndex = 0;

		for (let i = 0; i < Math.floor(halfValue); i++) {
			emptyStars[i] = fullStar;
			finalIndex = i + 1;
		}
		if (halfValue !== Math.floor(halfValue)) {
			emptyStars[finalIndex] = halfStar;
		}
		return emptyStars;
	}
  const formatDescription = () => {
    const stringList = video.description.split("\n")
    return stringList.map((f) => {
      return <p className="description-line">{f}</p>
    })
  }

  const renderNewReviewBtn = () => {
    console.log(video.reviews)
    const review = video.reviews?.find((r) => r.userId === user?.id);
    if (!review) {
      return (
        <Button className="review-button" text="Avalie" onClick={renderNewReviewModal}/>
      )
    }
  }

  return (
    <div className="video-container flex-column">
      <div className="video_detail width-100">
        <iframe className="video-iframe width-100" src={`//www.youtube.com/embed/${video.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      <h2 className="video-title">{video.title}</h2>
      <div className="flex-row description">
        <div className="flex-column text-container">
          <p>Por <a className="channel">{video.channelTitle}</a></p>
          {formatDescription()}
        </div>
        <div className="rating-card flex-column">
          <div>
            <h3>Média de avaliações</h3>
            {!video.averageRating ? (
              <div className="first-review-msg">
                <p>Este vídeo ainda não foi avaliado.</p>
                <p>Seja o primeiro a avaliar clicando no botão abaixo:</p>
              </div>
            ) : (
              <div>
                <p className="rate">{video.averageRating.toFixed(1)}</p>
                <div className="flex-row stars">
                  {getNumberOfStars(video.averageRating)}
                </div>
              </div>
            )}
          </div>
          { renderNewReviewBtn() }
        </div>
      </div>
    </div>
  )
}

export default VideoDetailCard;