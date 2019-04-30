// @flow

const items = [
  { id: 1, name: '快晴' },
  { id: 2, name: '晴れ' },
  { id: 3, name: 'くもり' },
  { id: 4, name: '雨' },
  { id: 5, name: '小雨' },
  { id: 6, name: 'ゆき' },
  { id: 7, name: '雷雨' },
  { id: 8, name: '豪雨' },
  { id: 9, name: '雷' },
];

export const getWeathers = () => {
  return items;
};

export const getWeatherName = (id: number) => {
  let weatherName;
  items.filter((item, index) => {
    if (id === item.id) {
      weatherName = item.name;
    }
  });
  return weatherName;
};
