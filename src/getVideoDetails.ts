import { Database, PromiseObject } from "./types/types";

const https = require(`https`);
const axios = require(`axios`).default;

export const getVideoDetails = (database: Database): Array<PromiseObject> => {
  let ArrayOfPromises: Array<PromiseObject> = [];
  for (let key in database) {
    for (let id of database[key]) {
      ArrayOfPromises.push({
        videoPromise: axios.get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&regionCode=IN&key=AIzaSyCZB9Mug8n4flDqlfwKbm_2x40SfnjS_XU`,
          {
            httpsAgent: new https.Agent({ keepAlive: true }),
            timeout: 60000,
          }
        ),
        category: key,
      });
    }
  }

  return ArrayOfPromises;
};
