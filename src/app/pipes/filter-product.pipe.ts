import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ICategory, ISubCategory } from '../models/categories.model';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {
  transform(products: IProduct[] | undefined, type: ICategory | ISubCategory, isLogin?: boolean): IProduct[] {
    if (products && type) {
      if (type.id == 0) {
        return products.filter(p => p.category.id == 1)
      }
      if (type.id == 1) {
        return products.slice(0, 12);
      }
      return products.filter(p => {
        return (p.category.id == type.id?.toString() && p.category.name == type.name) || 
                (p.subcategory?.id == type.id?.toString() && p.subcategory?.name == type.name && p.subcategory)
      });
    }
    return [];
  }
}
