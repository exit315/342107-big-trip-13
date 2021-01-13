import dayjs from "dayjs";
import {FilterType} from "./const.js";

const isPointFuture = (dateBegin) => {
  return dateBegin === null ? false : dayjs().isBefore(dateBegin, `D`) || dayjs().isSame(dateBegin, `D`);
};

const isPointPast = (dateBegin) => {
  return dateBegin === null ? false : dayjs().isAfter(dateBegin, `D`);
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateBegin)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateBegin))
};
