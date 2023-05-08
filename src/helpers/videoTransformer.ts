import { VideoGetType, VideoType } from "../types/Video";

export const videoUrl = (id: string) => {
  return `https://www.youtube.com/embed/${id}`
}

export const videoTransformer = (video: VideoGetType): VideoType => {
  if(video.items !== undefined) {
    const item = video.items[0];
    const dateFormat = new Date(item.snippet.publishedAt.value);
    const newVideo: VideoType = {
      id: item.id.videoId,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      description: item.snippet.description,
      publishedAt: dateFormat.toDateString(),
      embedHtml: item.player ? item.player.embedHtml : "",
      url: videoUrl(item.id.videoId),
      thumbnail: item.snippet.thumbnails.medium.url,
      likeCount: item.statistics ? item.statistics.likeCount : 0,
      viewCount: item.statistics ? item.statistics.viewCount : 0,
      tags: item.snippet.tags,
    }
    return newVideo; 
  } else if (video.videoDTO !== undefined){
    const item = video.videoDTO;
    const dateFormat = new Date(item.publishedAt);
    const newVideo: VideoType = {
      id: item.id,
      title: item.title,
      channelName: item.channelName,
      description: item.description,
      publishedAt: dateFormat.toDateString(),
      embedHtml: item.embedHtml,
      url: videoUrl(item.id),
      thumbnail: item.thumbnail ?? "",
      likeCount: item.likeCount,
      viewCount: item.viewCount,
      tags: item.tags,
      rate: video.averageRating
    }
    return newVideo;
  } else {
    const emptyVideo: VideoType = {id: "", title:"", url:"", publishedAt:"", channelName:"", embedHtml:""}
    return emptyVideo;
  }
}

export const videoClientTransformer = (response: VideoGetType): VideoType[] => {
  if(response?.items === undefined) {
    const emptyVideo: VideoType[] = [{ id: "", title: "", url: "", publishedAt: "", channelName: "", embedHtml: "" }];
    return emptyVideo;
  }
  return response.items.map((video) => {
      const dateFormat = new Date(video.snippet.publishedAt.value);
      const newVideo: VideoType = {
        id: video.id.videoId,
        title: video.snippet.title,
        channelName: video.snippet.channelTitle,
        description: video.snippet.description,
        publishedAt: dateFormat.toDateString(),
        url: videoUrl(video.id.videoId),
        thumbnail: video.snippet.thumbnails.medium.url,
        tags: video.snippet.tags
      }
      return newVideo;
  });
}