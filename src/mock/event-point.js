import dayjs from "dayjs";
import {nanoid} from '../vendor/nanoid';
import {DESTINATIONS} from "../utils/const.js";
import {POINTS} from "../utils/const.js";
import {getRandomInteger, generateDuration} from "../utils/utils.js";

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
  const daysGap = getRandomInteger(1, 14);

  return dayjs().add(daysGap, `day`).toDate();
};

export const generateEventPoint = () => {
  const dateBegin = generateDate();
  const dateEnd = generateDate();

  return {
    id: generateId(),
    pointType: createEventPointType(),
    destination: createEventPointDestination(),
    timeBegin: dayjs(dateBegin),
    timeEnd: dayjs(dateEnd),
    dateBegin: dayjs(dateBegin),
    dateEnd: dayjs(dateEnd),
    duration: generateDuration(dayjs(dateBegin), dayjs(dateEnd)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    price: getRandomInteger(20, 500),
  };
};
