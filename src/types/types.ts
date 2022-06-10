import { AxiosResponse } from "axios";

export type Thumbnail = {
  url: string;
  width: Number;
  height: Number;
};
export type Video = {
  url: string;
  category: string;
  viewCount: Number;
  likeCount: Number;
  title: string;
  description: string;
  thumbnails: {
    [key: string]: Thumbnail;
  };
  channelId: string;
  channelTitle: string;
  duration: string;
};

export type time = {
  hours: string;
  minutes: string;
  seconds: string;
};

export type Database = {
  [key: string]: Array<String>;
};

export type PromiseObject = {
  videoPromise: Promise<AxiosResponse>;
  category: string;
};
