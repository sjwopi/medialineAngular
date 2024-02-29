import { Component } from '@angular/core';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { ICategory, ISubCategory } from 'src/app/models/categories.model';
import { IProduct } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  constructor(
    public authService: AuthService,
    public productService: ProductService,
    public categoriesService: CategoriesService
  ) { }
  products?: IProduct[];
  categor: ICategory[] = this.categoriesService.categories
  isLogin: boolean = this.authService.isLogin();
  sortByType: ICategory | ISubCategory = this.categor[0];
  allTypesProduct: string[] = []
  sidebarHTML: Element | null | undefined;
  catalogHTML: Element | null | undefined;
  allPanelTypes = IPanelTypes;
  isLoad: boolean = true;
  searchInputValue: string = "";

  changeSort(e: any, category: ICategory | ISubCategory) {
    this.sidebarHTML!.querySelector('.active')?.classList.remove('active')
    e.target.classList.add('active')
    this.sortByType = category;
    
    if (document.documentElement.clientWidth <= 1000) {
      window.scrollTo({
        top: this.catalogHTML!.getBoundingClientRect().top,
        left: 0,
        behavior: "smooth",
      })
    }
  }

  openSubCat(e: any, category: ICategory | ISubCategory) {
    this.changeSort(e, category);
    e.target.parentElement.querySelectorAll('.child')?.forEach((item: any) => item.classList.toggle('show'))
  }

  changeSearchValue() {

  }

  ngOnInit(): void {
    this.isLoad = true;
    this.sidebarHTML = document.querySelector('.catalogPage__sidebar');
    this.catalogHTML = document.querySelector('.catalogPage__list');
    
    this.categoriesService.getCategory().subscribe(items => {
      this.categor = items;
      if(this.isLogin) {
        const catWithout: ICategory = {
          id: 0,
          name: "Без категории",
          subcategories: []
        }
        this.categor.unshift(catWithout)
      }
      this.sortByType = items[0];

      this.productService.getAll().pipe().subscribe(items => {
        this.products = items.reverse();
        this.isLoad = false;
        this.sidebarHTML?.querySelector('.catalogPage__sidebar-item')?.classList.add('active')
      })
    })
  }
}
