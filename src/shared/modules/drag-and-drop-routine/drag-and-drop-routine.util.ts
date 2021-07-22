import _ from 'lodash';
import { objectDifferences } from 'shared/util';
import { ColumnItems, ColumnItem } from './shared/model';

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

export const compareColumns = (initialData: ColumnItem[][], newData?: ColumnItem[][]) => {
  const flattenInitialData = _.flatten(initialData);
  const flattenNewData = _.flatten(newData);
  let ban = false;
  if (flattenInitialData.length === flattenNewData.length) {
    flattenInitialData.forEach((item, i) => {
      if (Object.keys(objectDifferences(item.data, flattenNewData[i].data)).length) {
        ban = true;
      } else if (Object.keys(objectDifferences(item, flattenNewData[i])).length) {
        ban = true;
      }
    });
  } else {
    ban = true;
  }
  return ban;
};

export const findElement = (uuid: string, columns: ColumnItem[][]) => {
  const result = _.find(columns, items => _.some(items, item => uuid === item.uuid));
  const item = result !== undefined ? _.find(result, ['uuid', uuid]) : undefined;
  return item;
};

export const findElementInColumn = (uuid: string, columns: ColumnItem[]) => {
  return _.find(columns, items => _.some(items, item => uuid === item.uuid));
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

export const parseDataToColumns = (data: ColumnItem[], maxColumn: number) => {
  const ordered = _.orderBy(data, 'position', 'asc');
  const grouped = insertEmptyColumns(_.groupBy(ordered, 'column'), maxColumn);
  return Object.values(grouped);
};

const insertEmptyColumns = (columns: ColumnItems, maxDay: number) => {
  const columnsCopy = columns;
  if (maxDay === -1) return [[], [], []];
  for (let i = 0; i < maxDay; i++) {
    if (!columnsCopy[i]) columnsCopy[i] = [];
  }
  return columnsCopy;
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

export const dropdownMenuOptions = [{ value: 1, label: 'Importar' }];
