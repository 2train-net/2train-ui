import _ from 'lodash';

export const objectDifferences = (object1: any, base1: any): any => {
  function changes(object2: any, base2: any) {
    return _.transform(object2, (result: any, value: any, key: string) => {
      if (!_.isEqual(value, base2[key])) {
        result[key] = _.isObject(value) && _.isObject(base2[key]) ? changes(value, base2[key]) : value;
      }
    });
  }
  return changes(object1, base1);
};
