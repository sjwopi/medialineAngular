export interface ICategory {
  id?: number;
  name: string;
  subcategories?: ISubCategory[];
}

export interface ISubCategory {
  id?: number;
  name: string;
  categoryId: number;
}