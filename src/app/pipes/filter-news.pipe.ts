import { Pipe, PipeTransform } from '@angular/core';
import { INewsItem } from '../models/news.model';

@Pipe({
  name: 'filter'
})
export class FilterNewsPipe implements PipeTransform {
  transform(news: INewsItem[], form: boolean[]): INewsItem[] {


    return news
  }
}