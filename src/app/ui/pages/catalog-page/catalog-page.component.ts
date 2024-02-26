import { Component } from '@angular/core';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { ICategory } from 'src/app/models/categories.model';
import { IProduct } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  constructor(
    public productService: ProductService,
    public categoriesService: CategoriesService
  ) { }
  products?: IProduct[];
  sortByType: string = "1";
  allTypesProduct: string[] = []
  categor: ICategory[] = this.categoriesService.categories
  sidebarHTML: Element | null | undefined;
  allPanelTypes = IPanelTypes;
  isLoad: boolean = true;

  changeSort(e: any, category: string) {
    this.sidebarHTML!.querySelector('.active')?.classList.remove('active')
    e.target.classList.add('active')
    this.sortByType = category;
  }

  openSubCat(e: any, category: string) {
    this.changeSort(e, category);
    e.target.parentElement.querySelectorAll('.child')?.forEach((item: any) => item.classList.toggle('show'))
  }

  ngOnInit(): void {
    this.isLoad = true;
    this.sidebarHTML = document.querySelector('.catalogPage__sidebar');
    
    this.categoriesService.getCategory().subscribe(items => {
      this.categor = items;

      this.productService.getAll().pipe().subscribe(items => {
        this.products = items.reverse();
        this.isLoad = false;
      })
    })
  }
}
