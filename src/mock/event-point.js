import dayjs from "dayjs";
import moment from "moment";
import {EVENT_POINT_TYPES} from "../utils/const.js";
import {TEXT_EXAMPLES} from "../utils/const.js";
import {EVENT_POINT_DESTINATIONS} from "../utils/const.js";
import {ADDITIONAL_OFFERS} from "../utils/const.js";
import {getRandomInteger} from "../utils/utils.js";

export {generateEventPoint};

const createEventPointType = () => {
  const randomIndex = getRandomInteger(0, EVENT_POINT_TYPES.length - 1);

  return EVENT_POINT_TYPES[randomIndex];
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
  };
  return textDescription.join('');
};

const createAdditionalOffer = () => {
  const randomCount = getRandomInteger(0, 5);
  const offersList = new Array(randomCount).fill();

  if (offersList.length > 0) {
    for (let i = 0; i < randomCount; i++) {
      offersList[i] = ADDITIONAL_OFFERS[getRandomInteger(0, ADDITIONAL_OFFERS.length - 1)];
    };
  };

  const offersListUnic = new Set(offersList);
  return offersListUnic;
};

const generateDate = () => {
  const maxDayGap = 7;
  const daysGap = getRandomInteger(0, maxDayGap);

  return dayjs().add(daysGap, `day`).toDate();
};

const generateDuration = (dayStart, dayEnd) => {
  const difference = dayEnd.diff(dayStart, 'ms');
  const duration = moment.duration(difference);

  return duration;
};

const generateEventPoint  = () => {
  const dateBegin = generateDate();
  const dateEnd = generateDate();

  return {
    pointType: createEventPointType(),
    destination: createEventPointDestination(),
    offers: createAdditionalOffer(),
    timeBegin: dayjs(dateBegin).format(`H:M`),
    timeEnd: dayjs(dateEnd).format(`H:M`),
    dateBegin: dayjs(dateBegin),
    dateEnd: dayjs(dateEnd),
    duration: generateDuration(dayjs(dateBegin), dayjs(dateEnd)),
    isFavorite: Boolean(getRandomInteger(0,1)),
    destinationDescription: {
      text: createTextDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    price: getRandomInteger(20, 500)
  }
};
