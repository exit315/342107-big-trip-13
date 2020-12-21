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
    ]
  },
  {
    typeOfPoint: `Sightseeing`,
    offers: [
      {
        type: `meal`,
        title: `Add meal`,
        price: `15`
      },
      {
        type: `train`,
        title: `Travel by train`,
        price: `40`
      },
    ]
  },
  {
    typeOfPoint: `Restaurant`,
    offers: [
      {
        type: `meal`,
        title: `Add meal`,
        price: `15`
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`
      },
    ]
  },
  {
    typeOfPoint: `Taxi`,
    offers: [
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`
      },
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
    ]
  },
  {
    typeOfPoint: `Bus`,
    offers: [
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`
      },
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
    ]
  },
  {
    typeOfPoint: `Train`,
    offers: [
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
        type: `luggage`,
        title: `Add luggage`,
        price: `30`
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`
      },
    ]
  },
  {
    typeOfPoint: `Ship`,
    offers: [
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
        type: `luggage`,
        title: `Add luggage`,
        price: `30`
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`
      },
    ]
  },
  {
    typeOfPoint: `Transport`,
    offers: [
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
    ]
  },
  {
    typeOfPoint: `Drive`,
    offers: [
      {
        type: `seats`,
        title: `Choose seats`,
        price: `5`
      },
      {
        type: `train`,
        title: `Travel by train`,
        price: `40`
      },
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
    ]
  },
  {
    typeOfPoint: `Flight`,
    offers: [
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
        type: `luggage`,
        title: `Add luggage`,
        price: `30`
      },
      {
        type: `comfort`,
        title: `Switch to comfort class`,
        price: `100`
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
