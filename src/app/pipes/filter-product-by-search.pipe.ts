import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'filterProductBySearch',
  standalone: true
})
export class FilterProductBySearchPipe implements PipeTransform {
  transform(product: IProduct[], search: string): IProduct[] {
    if (search.length === 0) return product
    return product.filter(p => (p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())))
  }
}
