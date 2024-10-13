import { controlType } from './enums';

export type Controls = {
  id: string;
  type: controlType;
  placeholder?: string;
  label: string;
  defaultValue: any;
};

export type Element = {
  id: string;
  title: string;
  icon: React.ReactElement;
  controls: Controls[];
  secClasses?: string;
  elClasses?: string;
};

export type DroppedElement = {
  id: string;
  elType: string;
  controls: Controls[];
  data: any;
  secClasses: string;
  elClasses: string;
};
