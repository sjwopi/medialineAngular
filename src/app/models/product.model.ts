import { ICategory, ISubCategory } from "./categories.model"

export interface IProduct {
  id?: number
  title: string
  description: string
  imagePath: string
  category: ICategory
  subcategory?: ISubCategory
  specials?: string
  packaging?: string
}

