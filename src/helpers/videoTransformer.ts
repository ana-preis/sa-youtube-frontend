import { VideoGetType, VideoType } from "../types/Video";

export const videoTransformer = (video: VideoGetType): VideoType => {
  if(video.items !== undefined) {
    const item = video.items[0];
    const dateFormat = new Date(item.snippet.publishedAt.value);
    const newVideo: VideoType = {
      id: item.id,
      name: item.snippet.title,
      channel: item.snippet.channelTitle,
      description: item.snippet.description,
      publishedAt: dateFormat.toDateString(),
      embedHtml: item.player.embedHtml,
      url: `https://www.youtube.com/embed/${item.id}`,
      thumbnail: item.snippet.thumbnails.medium.url,
      likeCount: item.statistics.likeCount,
      viewCount: item.statistics.viewCount,
      tags: item.snippet.tags,
    }
    return newVideo; 
  } else if (video.videoDTO !== undefined){
    const item = video.videoDTO;
    const dateFormat = new Date(item.publishedAt);
    const newVideo: VideoType = {
      id: item.id,
      name: item.title,
      channel: item.channelName,
      description: item.description,
      publishedAt: dateFormat.toDateString(),
      embedHtml: item.embedHtml,
      url: `https://www.youtube.com/embed/${item.id}`,
      thumbnail: item.thumbnail ?? "",
      likeCount: item.likeCount,
      viewCount: item.viewCount,
      tags: item.tags
    }
    return newVideo;
  } else {
    const emptyVideo: VideoType = {id: "", name:"", url:"", publishedAt:"", channel:"", embedHtml:""}
    return emptyVideo;
  }
}