import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {
  transform(products: IProduct[], type: string): IProduct[] {
    if (type.toLowerCase() === "all") {
      return products
    }
    return products.filter(p => p.type.toLowerCase() === type.toLowerCase())
  }
}
