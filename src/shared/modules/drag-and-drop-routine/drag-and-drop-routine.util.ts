import _ from 'lodash';
import { ColumnItems, ColumnItem } from './column-items.interface';

export const parseColumnsToData = (columns: ColumnItem[][], data: ColumnItem[]) => {
  const array = columns.reduce((items, column) => [...items, ...column], []);

  const edited: ColumnItem[] = [];

  let deleted = _.differenceWith(data, array, _.isEqual);
  let created = _.differenceWith(array, data, _.isEqual);

  created.forEach(creItem => {
    deleted.forEach((delItem, indexD) => {
      if (delItem.uuid === creItem.uuid) {
        edited.push(creItem);
        deleted.splice(indexD, 1);
      }
    });
  });

  created = _.differenceWith(created, edited, _.isEqual);

  return {
    create: created,
    update: edited,
    delete: deleted
  };
};

export const findElement = (uuid: string, columns: ColumnItem[][]) => {
  const result = _.find(columns, items => _.some(items, item => uuid === item.uuid));
  const item = result !== undefined ? result[0] : undefined;
  return item;
};

export const updatePositionsAndColumns = (data: ColumnItem[][]) => {
  return data.map((items, column) =>
    items.map((item, position) => ({
      ...item,
      column: column,
      position: position
    }))
  );
};

export const parseDataToColumns = (data: ColumnItem[]) => {
  const ordered = _.orderBy(data, 'position', 'asc');
  const grouped = insertEmptyColumns(_.groupBy(ordered, 'column'));
  return Object.values(grouped);
};

const insertEmptyColumns = (columns: ColumnItems) => {
  const columnsCopy = columns;
  for (let i = 0; i < maxItemDay(columns); i++) {
    if (!columnsCopy[i]) columnsCopy[i] = [];
  }
  return columnsCopy;
};

const maxItemDay = (columns: ColumnItems) => {
  let max: number = 0;
  Object.entries(columns).map(([column], index) => {
    if (parseInt(column) > max) max = parseInt(column);
  });
  return max;
};

export const dayOptions = [
  { value: 1, label: '1 Día' },
  { value: 2, label: '2 Días' },
  { value: 3, label: '3 Días' },
  { value: 4, label: '4 Días' },
  { value: 5, label: '5 Días' },
  { value: 6, label: '6 Días' },
  { value: 7, label: '7 Días' }
];
