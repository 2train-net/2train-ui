import { RefObject } from 'react';

export interface ColumnItem extends Item {
  position: number;
  column: number;
  option: Option;
  data: any;
}

export interface Item {
  uuid: string;
}

export interface Option extends Item {
  name: string;
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

export interface DetailData {
  values?: any;
}

export interface OptionFormData {
  searchInput: string;
  onFinishAction: () => void;
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
