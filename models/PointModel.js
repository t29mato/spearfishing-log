// @flow

import { SQLite } from 'expo';

const db = SQLite.openDatabase('db');

export type Point = {
  id: number,
  name: string,
};

export type Points = [Point];

export const getPoints = () => {
  return new Promise<Points, string>((resolve, reject) => {
    db.transaction(
      tx => {
        // tx.executeSql('drop table if exists points;', null, alert('success'), (_, msg) => alert('failed' + JSON.stringify(msg)));
        tx.executeSql(
          'create table if not exists points (id integer primary key not null, name text, memo text);'
        ),
          null,
          tx.executeSql('select * from points', null, (_, { rows: { _array } }) => {
            resolve(_array);
          }),
          (_, error) => console.log(error);
      },
      error => console.log('failed transaction: ' + error),
      () => console.log('success transaction')
    );
  });
};

export const getPoint = (pointId: number) => {
  return new Promise<Point, string>((resolve, reject) => {
    db.transaction(
      tx => {
        // tx.executeSql('drop table if exists points;', null, alert('success'), (_, msg) => alert('failed' + JSON.stringify(msg)));
        tx.executeSql(
          'create table if not exists points (id integer primary key not null, name text, memo text);'
        ),
          null,
          tx.executeSql(
            'SELECT * FROM points WHERE id = ?',
            [pointId],
            (_, { rows: { _array } }) => {
              resolve(_array[0]);
            }
          ),
          (_, error) => console.log(error);
      },
      error => console.log('failed transaction: ' + error),
      () => console.log('success transaction')
    );
  });
};
