import { RefObject } from 'react';

export interface ColumnItem extends Item {
  position: number;
  column: number;
  option: Item;
  data: any;
}

export interface Item {
  uuid: string;
}

export interface Option extends Item {
  [data: string]: any;
}

export interface ColumnItems {
  [column: number]: ColumnItem[];
}

export interface FormData {
  initialValues?: any;
  onSubmit: (values: any) => any;
  formRef: RefObject<HTMLFormElement>;
}

export interface ICard {
  data: any;
}

export interface Params {
  uuid: string;
}

export interface IDragAndDropRoutineFormValues {
  create: ColumnItem[];
  update: ColumnItem[];
  delete: ColumnItem[];
}
