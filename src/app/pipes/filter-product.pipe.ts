import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ICategory, ISubCategory } from '../models/categories.model';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {
  transform(products: IProduct[] | undefined, type: ICategory | ISubCategory): any[] {
    if (products && type) {
      if (type.name.toLowerCase() == 'все категории') {
        return products.slice(0, 12);
      }
      return products.filter(p => {
        return (p.category.id == type.id?.toString() && p.category.name == type.name && !p.subcategory) || (p.subcategory?.id == type.id?.toString() && p.subcategory?.name == type.name && p.subcategory)
      });
    }
    return [];
  }
}
