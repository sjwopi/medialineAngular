export interface IProduct {
  id?: number
  title: string
  description: string
  imagePath: string
  category: string
  peculiarities?: string[]
  equipment?: string[]
}