export type Element = {
  id: string;
  title: string;
  icon: React.ReactElement;
  elements?: Array<any>;
  secClasses?: string;
  elClasses?: string;
};

export type DroppedElement = {
  id: string;
  elType: string;
  elements: any;
  secClasses: string;
  elClasses: string;
};
