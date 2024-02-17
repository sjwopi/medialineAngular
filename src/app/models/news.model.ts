export interface INewsItem {
  id?: number
  title: string
  text: string
  time: string
  imagePath: string | ArrayBuffer | null
}