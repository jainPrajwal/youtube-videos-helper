import { time } from "./types/types";

export const getFormattedTime = (duration: string): time => {
  let obj = { hours: undefined, minutes: undefined, seconds: undefined };
  let slicedDuration = duration.slice(2);
  let minutesSplit = [];
  let secondsSplit = [];
  let hoursSplit = slicedDuration.split(`H`);

  if (hoursSplit[1]) {
    obj.hours = hoursSplit[0];
    minutesSplit = hoursSplit[1].split(`M`);
    if (minutesSplit[1]) {
      obj.minutes = minutesSplit[0];
      secondsSplit = minutesSplit[1].split(`S`);
    } else {
      secondsSplit = slicedDuration.split(`S`);
    }

    obj.seconds = secondsSplit[0];
  } else {
    minutesSplit = slicedDuration.split(`M`);
    console.log(`minutes Split`, minutesSplit);

    if (minutesSplit[1]) {
      obj.minutes = minutesSplit[0];
      secondsSplit = minutesSplit[1].split(`S`);
    } else {
      secondsSplit = slicedDuration.split(`S`);
    }

    obj.seconds = secondsSplit[0];
  }

  return obj;
};
