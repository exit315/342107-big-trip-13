export const POINT_TYPES = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`
];

export const POINTS = [
  {
    typeOfPoint: `Check-in`,
    offers: null
  },
  {
    typeOfPoint: `Sightseeing`,
    offers: [
      {
        type: `meal`,
        title: `Add meal`,
        price: `15`,
        isChecked: true
      },
      {
        type: `train`,
        title: `Travel by train`,
        price: `40`,
        isChecked: false
      },
    ]
  },
  {
    typeOfPoint: `Restaurant`,
    offers: [
      {
        type: `meal`,
        title: `Add meal`,
        price: `15`,
        isChecked: false
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`,
        isChecked: true
      },
    ]
  },
  {
    typeOfPoint: `Taxi`,
    offers: [
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`,
        isChecked: false
      },
      {
        type: `luggage`,
        title: `Add luggage`,
        price: `30`,
        isChecked: true
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`,
        isChecked: false
      },
    ]
  },
  {
    typeOfPoint: `Bus`,
    offers: [
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`,
        isChecked: true
      },
      {
        type: `luggage`,
        title: `Add luggage`,
        price: `30`,
        isChecked: false
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`,
        isChecked: true
      },
    ]
  },
  {
    typeOfPoint: `Train`,
    offers: [
      {
        type: `meal`,
        title: `Add meal`,
        price: `15`,
        isChecked: true
      },
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`,
        isChecked: true
      },
      {
        type: `luggage`,
        title: `Add luggage`,
        price: `30`,
        isChecked: false
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`,
        isChecked: false
      },
    ]
  },
  {
    typeOfPoint: `Ship`,
    offers: [
      {
        type: `meal`,
        title: `Add meal`,
        price: `15`,
        isChecked: false
      },
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`,
        isChecked: false
      },
      {
        type: `luggage`,
        title: `Add luggage`,
        price: `30`,
        isChecked: false
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`,
        isChecked: true
      },
    ]
  },
  {
    typeOfPoint: `Transport`,
    offers: [
      {
        type: `luggage`,
        title: `Add luggage`,
        price: `30`,
        isChecked: false
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`,
        isChecked: true
      },
      {
        type: `meal`,
        title: `Add meal`,
        price: `15`,
        isChecked: true
      },
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`,
        isChecked: true
      },
      {
        type: `train`,
        title: `Travel by train`,
        price: `40`,
        isChecked: false
      }
    ]
  },
  {
    typeOfPoint: `Drive`,
    offers: [
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`,
        isChecked: true
      },
      {
        type: `train`,
        title: `Travel by train`,
        price: `40`,
        isChecked: false
      },
      {
        type: `luggage`,
        title: `Add luggage`,
        price: `30`,
        isChecked: false
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`,
        isChecked: true
      },
    ]
  },
  {
    typeOfPoint: `Flight`,
    offers: [
      {
        type: `meal`,
        title: `Add meal`,
        price: `15`,
        isChecked: true
      },
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`,
        isChecked: false
      },
      {
        type: `luggage`,
        title: `Add luggage`,
        price: `30`,
        isChecked: false
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`,
        isChecked: false
      },
    ]
  }
];

export const DESTINATION_TYPES = [
  `Liverpool`,
  `London`,
  `Amsterdam`,
  `Stavanger`,
  `Trondheim`,
  `Brugge`,
  `Praha`,
  `Lisboa`,
  `Oslo`,
  `Reykjavík`
];


export const DESTINATIONS = [
  {
    title: `Liverpool`,
    description: null,
    photos: null
  },
  {
    title: `London`,
    description: `Fusce tristique felis at fermentum pharetra. Sed sed nisi sed augue convallis suscipit in sed felis.`,
    photos: [`http://picsum.photos/248/152?r=0.2287009170143086`, `http://picsum.photos/248/152?r=0.9391460172237087`, `http://picsum.photos/248/152?r=0.9233381928506377`, `http://picsum.photos/248/152?r=0.7544853524628241`]
  },
  {
    title: `Amsterdam`,
    description: `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Cras aliquet varius magna, non porta ligula feugiat eget. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    photos: [`http://picsum.photos/248/152?r=0.9391460172237087`, `http://picsum.photos/248/152?r=0.9233381928506377`, `http://picsum.photos/248/152?r=0.7544853524628241`, `http://picsum.photos/248/152?r=0.2287009170143086`]
  },
  {
    title: `Stavanger`,
    description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    photos: [`http://picsum.photos/248/152?r=0.6516305937077944`, `http://picsum.photos/248/152?r=0.9233381928506377`, `http://picsum.photos/248/152?r=0.9233381928506377`, `http://picsum.photos/248/152?r=0.7544853524628241`]
  },
  {
    title: `Trondheim`,
    description: `Fusce tristique felis at fermentum pharetra. Aliquam erat volutpat. In rutrum ac purus sit amet tempus. Aliquam erat volutpat.`,
    photos: [`http://picsum.photos/248/152?r=0.9233381928506377`, `http://picsum.photos/248/152?r=0.7544853524628241`, `http://picsum.photos/248/152?r=0.6516305937077944`, `http://picsum.photos/248/152?r=0.017151217508655225`]
  },
  {
    title: `Brugge`,
    description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    photos: [`http://picsum.photos/248/152?r=0.9607347539991706`, `http://picsum.photos/248/152?r=0.7544853524628241`, `http://picsum.photos/248/152?r=0.6516305937077944`]
  },
  {
    title: `Praha`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique felis at fermentum pharetra. In rutrum ac purus sit amet tempus.`,
    photos: [`http://picsum.photos/248/152?r=0.9607347539991706`, `http://picsum.photos/248/152?r=0.012181689225933656`, `http://picsum.photos/248/152?r=0.6516305937077944`]
  },
  {
    title: `Lisboa`,
    description: null,
    photos: null
  },
  {
    title: `Oslo`,
    description: `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. Cras aliquet varius magna, non porta ligula feugiat eget. Sed sed nisi sed augue convallis suscipit in sed felis. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    photos: [`http://picsum.photos/248/152?r=0.017151217508655225`, `http://picsum.photos/248/152?r=0.8551107985546689`, `http://picsum.photos/248/152?r=0.6516305937077944`]
  },
  {
    title: `Reykjavík`,
    description: null,
    photos: null
  }
];

export const TEXT_EXAMPLES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. `,
  `Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus. `
];

export const ADDITIONAL_OFFERS = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: `30`
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: `100`
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: `15`
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: `5`
  },
  {
    type: `train`,
    title: `Travel by train`,
    price: `40`
  }
];

export const SortType = {
  DAY: `day`,
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
  OFFER: `offer`
};

export const NEW_EVENT_POINT = {
  pointType: ``,
  destination: ``,
  dateBegin: ``,
  dateEnd: ``,
  destinationDescription: {
    text: ``,
    photo: ``
  }
};

export const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};
