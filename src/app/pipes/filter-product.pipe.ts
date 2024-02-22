import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {
  transform(products: IProduct[], type: string[]): IProduct[] {
    if (type[0].toLowerCase() == "все категории") {
      return products;
    }
    let result: IProduct[] = [];

    type.forEach(item => {
      let temp = products.filter(p => {
        return p.category.toLowerCase() === item.toLowerCase()
      });
      result.push(...temp)
    })

    return result;
  }
}
