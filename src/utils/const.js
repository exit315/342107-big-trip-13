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
    offers: [
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
        type: `train`,
        title: `Travel by train`,
        price: `40`,
        isChecked: true
      }
    ]
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

export const EVENT_POINT_DESTINATIONS = [
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

export const SORTING_TYPES = [
  `day`,
  `event`,
  `time`,
  `price`,
  `offer`
];

export const FILTERS_TYPES = [
  `everything`,
  `future`,
  `past`
];

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
