import { Pipe, PipeTransform } from '@angular/core';
import { INewsItem } from '../models/news.model';

@Pipe({
  name: 'filter'
})
export class FilterNewsPipe implements PipeTransform {
  transform(news: INewsItem[], form: boolean[]): INewsItem[] {

    /* if (form[0] && !form[1]) {
      return news.filter(p => p.format[0].name.toLowerCase() === 'online')
    } else if (!form[0] && form[1]) {
      return news.filter(p => p.format[0].name.toLowerCase() === 'offline')
    } */

    return news
  }
}