import { VideoGetType, VideoType } from "../types/Video";

export const videoTransformer = (video: VideoGetType): VideoType => {
  const item = video.items[0]
  const dateFormat = new Date(item.snippet.publishedAt.value);
  const newVideo: VideoType = {
    id: item.id,
    name: item.snippet.title,
    channel: item.snippet.channelTitle,
    description: item.snippet.description,
    publishedAt: dateFormat.toString(),
    embedHtml: item.player.embedHtml,
    url: `https://www.youtube.com/embed/${item.id}`,
    thumbnail: item.snippet.thumbnails.medium.url,
    likeCount: item.statistics.likeCount,
    viewCount: item.statistics.viewCount,
    tags: item.snippet.tags,
  }
  return newVideo; 
}