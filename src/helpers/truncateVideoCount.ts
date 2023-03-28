export const truncateVideoCount = (viewCount: number | undefined) => {
  if (viewCount == undefined) { return undefined }
  const truncatedCount = viewCount / 1000;
  return Math.floor(truncatedCount); 
}