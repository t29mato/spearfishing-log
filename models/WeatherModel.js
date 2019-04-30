// @flow

import weathers from '../data/master/weathers';

export const getWeathers = () => {
  return weathers;
};

export const getWeatherName = (id: number) => {
  let weatherName;
  weathers.filter((weather, index) => {
    if (id === weather.id) {
      weatherName = weather.name;
    }
  });
  return weatherName;
};
