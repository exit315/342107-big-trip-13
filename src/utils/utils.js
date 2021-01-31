export const generateDuration = (dayStart, dayEnd) => {
  const difference = dayEnd.diff(dayStart, `ms`);
  return difference;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const makeItemsUniq = (items) => [...new Set(items)];

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
