import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  products: IProduct[] = this.productService.products
  sortByType: string = "all";
  allTypesProduct: string[] = []

  constructor(
    public productService: ProductService
  ) { }

  changeSort(e: any) {
    this.sortByType = e.target.textContent
  }

  ngOnInit(): void {
    this.productService.getAll().pipe().subscribe(items => {

      /* console.log(Date.now()) */

      items.forEach(item => {
        if (!(this.allTypesProduct.includes(item.type))) {
          this.allTypesProduct.push(item.type)
        }
      })
      
      /* console.log(Date.now()) */
    })
  }
}
