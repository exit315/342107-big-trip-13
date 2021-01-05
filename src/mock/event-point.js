import dayjs from "dayjs";
import moment from "moment";
import {nanoid} from '../vendor/nanoid';
import {DESTINATIONS} from "../utils/const.js";
import {POINTS} from "../utils/const.js";
import {getRandomInteger} from "../utils/utils.js";

export const generateId = () => {
  const eventPointId = nanoid();
  return eventPointId;
};

const createEventPointType = () => {
  const randomIndex = getRandomInteger(0, POINTS.length - 1);
  return POINTS[randomIndex];
};

const createEventPointDestination = () => {
  const randomIndex = getRandomInteger(0, POINTS.length - 1);
  return DESTINATIONS[randomIndex];
};

const generateDate = () => {
  const maxDayGap = 7;
  const daysGap = getRandomInteger(0, maxDayGap);

  return dayjs().add(daysGap, `day`).toDate();
};

const generateDuration = (dayStart, dayEnd) => {
  const difference = dayEnd.diff(dayStart, `ms`);
  const duration = moment.duration(difference);

  return duration;
};

export const generateEventPoint = () => {
  const dateBegin = generateDate();
  const dateEnd = generateDate();

  return {
    id: generateId(),
    pointType: createEventPointType(),
    destination: createEventPointDestination(),
    timeBegin: dayjs(dateBegin).format(`H:MM`),
    timeEnd: dayjs(dateEnd).format(`H:MM`),
    dateBegin: dayjs(dateBegin),
    dateEnd: dayjs(dateEnd),
    duration: generateDuration(dayjs(dateBegin), dayjs(dateEnd)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    price: getRandomInteger(20, 500),
  };
};
