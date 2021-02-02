import dayjs from "dayjs";
import moment from "moment";
import {generateDuration} from "./utils.js";

export const sortPointDefaultDateUp = (pointA, pointB) => {
  return dayjs(pointA.dateBegin).diff(dayjs(pointB.dateBegin));
};

export const sortPointPriceUp = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortPointDurationUp = (pointA, pointB) => {
  const pointAEventDuration = moment.duration(generateDuration(dayjs(pointA.dateBegin), dayjs(pointA.dateEnd)));
  const pointBEventDuration = moment.duration(generateDuration(dayjs(pointB.dateBegin), dayjs(pointB.dateEnd)));

  return pointBEventDuration - pointAEventDuration;
};
