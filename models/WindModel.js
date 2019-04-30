// @flow

import winds from '../data/master/winds';

export const getWinds = () => {
  return winds;
};

export const getWindName = (id: number) => {
  let windName;
  winds.filter((weather, index) => {
    if (id === weather.id) {
      windName = weather.name;
    }
  });
  return windName;
};
