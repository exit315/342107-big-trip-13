import dayjs from "dayjs";
import moment from "moment";
import {nanoid} from '../vendor/nanoid';
import {TEXT_EXAMPLES} from "../utils/const.js";
import {EVENT_POINT_DESTINATIONS} from "../utils/const.js";
/* import {ADDITIONAL_OFFERS} from "../utils/const.js";*/
/* import {POINT_TYPES} from "../utils/const.js";*/
import {POINTS} from "../utils/const.js";
import {getRandomInteger} from "../utils/utils.js";

const generateId = () => {
  const eventPointId = nanoid();
  return eventPointId;
};

/*
const createAdditionalOffer = () => {
  const randomCount = getRandomInteger(0, 5);
  const offersList = new Array(randomCount).fill();

  if (offersList.length > 0) {
    for (let i = 0; i < randomCount; i++) {
      offersList[i] = ADDITIONAL_OFFERS[getRandomInteger(0, ADDITIONAL_OFFERS.length - 1)];
    }
  }
  const offersListUnic = new Set(offersList);
  return offersListUnic;
};

const createEventPointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  const eventPointType = {
    typeOfPoint: POINT_TYPES[randomIndex],
    offers: createAdditionalOffer()
  }

  return eventPointType;
};
*/

const createEventPointType = () => {
  const randomIndex = getRandomInteger(0, POINTS.length - 1);
  return POINTS[randomIndex];
};


const createEventPointDestination = () => {
  const randomIndex = getRandomInteger(0, EVENT_POINT_DESTINATIONS.length - 1);

  return EVENT_POINT_DESTINATIONS[randomIndex];
};

const createTextDescription = () => {
  const randomCount = getRandomInteger(1, 5);
  const textDescription = new Array(randomCount).fill();

  for (let i = 0; i < randomCount; i++) {
    textDescription[i] = TEXT_EXAMPLES[getRandomInteger(0, TEXT_EXAMPLES.length - 1)];
  }
  return textDescription.join(``);
};

const createPhotoDescription = () => {
  const randomCount = getRandomInteger(1, 5);

  const photoDescription = new Array(randomCount).fill();

  for (let i = 0; i < randomCount; i++) {
    photoDescription[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }

  return photoDescription;
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
    timeBegin: dayjs(dateBegin).format(`H:M`),
    timeEnd: dayjs(dateEnd).format(`H:M`),
    dateBegin: dayjs(dateBegin),
    dateEnd: dayjs(dateEnd),
    duration: generateDuration(dayjs(dateBegin), dayjs(dateEnd)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    destinationDescription: {
      text: createTextDescription(),
      photo: createPhotoDescription()
    },
    price: getRandomInteger(20, 500)
  };
};
