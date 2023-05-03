import { VideoType } from "../../types/Video";
import Button from "../../components/Button";
import "./styles.css";

interface VideoDetailCardProps {
	video: VideoType;
  renderNewReviewModal: () => void
}

const VideoDetailCard = (props: VideoDetailCardProps) => {
	const {video, renderNewReviewModal} = props;

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

  return (
    <div className="video-container flex-column">
      <div className="video width-100">
        <iframe className="video-iframe width-100" src={`//www.youtube.com/embed/${video.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      <h2 className="video-title">{video.name}</h2>
      <div className="flex-row description">
        <div className="flex-column text-container">
          <p>Por <a className="channel">{video.channel}</a></p>
          <p>{video.description}</p>
        </div>
        <div className="rating-card flex-column">
          <h3>Média de avaliações</h3>
          {!video.rate ? (
            <div className="first-review-msg">
              <p>Este vídeo ainda não foi avaliado.</p>
              <p>Seja o primeiro a avaliar clicando no botão abaixo:</p>
            </div>
          ) : (
            <div>
              <p className="rate">{video.rate}</p>
              <div className="flex-row stars">
                {getNumberOfStars(video.rate)}
              </div>
            </div>
          )}
          <Button className="review-button" text="Avalie" onClick={renderNewReviewModal}/>
        </div>
      </div>
    </div>
  )
}

export default VideoDetailCard;