import { Video } from "./types/types";

export const getNormalizedVideoDetails = ({
  arrayOfPromises,
  originalViews = true,
  originalLikes = true,
}): Promise<Array<Video>> => {
  let finalArray: Array<Video> = [];
  let completedPromises = 0;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach(async (promise) => {
      try {
        const response = await promise.videoPromise;
        const {
          data: { items },
        } = response;
        completedPromises += 1;
        items.forEach((item: any) => {
          delete item[`kind`];
          delete item[`etag`];
          delete item[`snippet`][`categoryId`];
          delete item[`snippet`][`liveBroadcastContent`];
          delete item[`snippet`][`localized`];
          delete item[`snippet`][`defaultAudioLanguage`];
          const { title, description, channelId, channelTitle, thumbnails } =
            item.snippet;
          const {
            contentDetails: { duration },
          } = item;
          const {
            statistics: { viewCount, likeCount },
          } = item;
          const normalizedObject: Video = {
            url: item.id,
            category: promise.category,
            viewCount: originalViews ? Number(viewCount) : 0,
            likeCount: originalLikes ? Number(likeCount) : 0,
            title,
            description,
            thumbnails,
            channelId,
            channelTitle,
            duration,
          };
          finalArray.push(normalizedObject);
        });

        if (completedPromises === arrayOfPromises.length - 1) {
          resolve(finalArray);
        }
      } catch (error) {
        console.log(`error`, error.message);
        reject(error);
      }
    });
  });
};
