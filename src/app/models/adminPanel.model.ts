export enum IPanelTypes {
  ItemCreate,
  ItemEdit
}

export enum IPanelItemTypes {
  INewsItem,
  IProduct
}

export interface IControls {
  placeholder: string;
  control: string;
  type: string;
}