import dayjs from "dayjs";

export const sortPointDefaultDateUp = (pointA, pointB) => {
  return dayjs(pointA.dateBegin).diff(dayjs(pointB.dateBegin));
};

export const sortPointPriceUp = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortPointDurationUp = (pointA, pointB) => {
  return pointB.duration - pointA.duration;
};
