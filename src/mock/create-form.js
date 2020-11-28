import {EVENT_POINT_TYPES} from "../utils/const.js";
import {TEXT_EXAMPLES} from "../utils/const.js";
import {EVENT_POINT_DESTINATIONS} from "../utils/const.js";
import {ADDITIONAL_OFFERS} from "../utils/const.js";
import {getRandomInteger} from "../utils/utils.js";

export {generateCreateEventForm};

const createTextDescription = () => {
  const randomCount = getRandomInteger(1, 5);

  const textDescription = new Array(randomCount).fill();

  for (let i = 0; i < randomCount; i++) {
    textDescription[i] = TEXT_EXAMPLES[getRandomInteger(0, TEXT_EXAMPLES.length - 1)];
  };

  return textDescription.join('');
};

const createPhotoDescription = () => {
  const randomCount = getRandomInteger(1, 5);

  const photoDescription = new Array(randomCount).fill();

  for (let i = 0; i < randomCount; i++) {
    photoDescription[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  };

  return photoDescription;
};

const generateCreateEventForm = () => {
  return {
    pointTypes: EVENT_POINT_TYPES,
    destinations: EVENT_POINT_DESTINATIONS,
    offers: ADDITIONAL_OFFERS,
    destinationDescription: {
      text: createTextDescription(),
      photo: createPhotoDescription(),
    },
  };
};
