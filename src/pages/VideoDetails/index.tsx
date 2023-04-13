import './styles.css'
import { MockVideoList } from "../../mocks/MockVideoList";
import Button from "../../components/Button";

const VideoDetails = () => {
	const video = MockVideoList[0]

	const getNumberOfStars = (rate: number | undefined) => {
		if (!rate) {
			return (<div></div>)
		}
		let stars = [];
		let rate1 = Math.round(rate) / 2
		let integrate = Math.trunc(rate1)
		// Colocar as 5 estrelas vazias por default e preencher primeiro as cheias. por ultimo verificar se tem meia.
		for (let i = 1; i <= 5; i++) {
			if (i <= integrate) {
				stars.push(<img src="./star.svg" alt="star" className="" />)
			} else if (i < rate1) {
				stars.push(<img src="./halfstar.svg" alt="star" className="" />)
			} else {
				stars.push(<img src="./emptystar.svg" alt="star" className="" />)
			}
		}

	}
	return (
		<>
			<div className="breadcrumb">
				Breadcrumb - Breadcrumb
			</div>
			<div className="video-detail flex-row">
				<div className="video-container flex-column">
					<iframe className="video" src={video.url} title="YouTube video player" height="525" width="870" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
					<div className="flex-row description">
						<div className="flex-column text-container">
							<h2 className="video-title">{video.name}</h2>
							<p>Por <a className="channel">{video.channel}</a></p>
							<p>{video.description}</p>
						</div>
						<div className="rating-card flex-column">
							<h3>Média de avaliações</h3>
							<p className="rate">{video.rate}</p>
							<div className="flex-row stars">
								{getNumberOfStars(video.rate)}
							</div>
							<Button className="review-button" text="Avalie"/>
						</div>
					</div>
					
					
				</div>
				<div className="related-videos-container">
					relacionados
				</div>
			</div>
		</>
	)       
}

export default VideoDetails;