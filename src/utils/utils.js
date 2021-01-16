export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateDuration = (dayStart, dayEnd) => {
  const difference = dayEnd.diff(dayStart, `ms`);
  return difference;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointsByFeature = (points, feature) => {
  return points.filter((point) => point.feature === feature).length;
};

export const calcStatistics = (points, uniqFeaturesArray) => {
  const initial = 0;
  const arr = [];

  for (let i = 0; i < uniqFeaturesArray.length; i++) {
    arr.push(points.reduce((newArr, point)=> {
      if (point.pointType.typeOfPoint === uniqFeaturesArray[i]) {
        newArr.push(point.feature);
      }
      return newArr;
    }, []));
  }

  const sumArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === 1) {
      sumArr.push(arr[i][0]);
    } else {
      sumArr.push(arr[i].reduce((sum, current) => {
        return sum + current;
      }, initial));
    }
  }

  return sumArr;
};

export const calcSum = (arr) => {
  const sumArr = [];
  const initial = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === 1) {
      sumArr.push(arr[i][0]);
    } else {
      sumArr.push(arr[i].reduce((sum, current) => {
        return sum + current;
      }, initial));
    }
  }

  return sumArr;
};
