import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {
  transform(products: any[] | undefined, type: string): any[] {
    
    if (products) {
      if (type == "1") {
        return products.slice(0, 12);
      }
      return products.filter(p => (p.category.id === type && !p.subcategory));
    }
    return [];
  }
}
