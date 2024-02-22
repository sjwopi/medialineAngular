import { Component } from '@angular/core';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  products: IProduct[] = this.productService.products
  sortByType: string[] = ["Все категории"];
  allTypesProduct: string[] = []
  categor: any;
  sidebarHTML: Element | null | undefined;

  constructor(
    public productService: ProductService
  ) { }

  allPanelTypes = IPanelTypes;

  changeUIBySort(e: any) {

  }
  changeSort(e: any, category: string[]) {
    this.sidebarHTML!.querySelector('.active')?.classList.remove('active')
    e.target.classList.add('active')

    this.sortByType = category;
  }
  openSubCat(e: any, category: string[]) {
    this.changeSort(e, category);
    e.target.parentElement.querySelectorAll('.child')?.forEach((item: any) => item.classList.toggle('show'))
  }

  ngOnInit(): void {
    this.sidebarHTML = document.querySelector('.catalogPage__sidebar');

    /*   this.productService.getAll().pipe().subscribe(items => {
        this.products = items.reverse();\
  
        items.forEach(item => {
          if (!(this.allTypesProduct.includes(item.category))) {
            this.allTypesProduct.push(item.category)
          }
        })
      }) */
    this.categor = [
      {
        id: 1,
        name: "Глюкометры",
        child: []
      },
      {
        id: 2,
        name: "Тест-полоски",
        child: []
      },
      {
        id: 3,
        name: "Инсулиновые помпы и расходные материалы",
        child: ["Инсулиновые помпы", "Расходные материалы", "Аксессуары и дополнительные устройства"]
      },
      {
        id: 4,
        name: "Чет еще",
        child: []
      },
      {
        id: 5,
        name: "Экспресс-диагностика",
        child: []
      },
      {
        id: 6,
        name: "Xnjnj + асходные + материалы",
        child: ["Xnjnj", "асходные", "материалы"]
      },
    ]
    
    this.products = [
      {
        id: 1,
        title: "Глюкометры",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "Глюкометры"
      },
      {
        title: "Тест-полоски",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "Тест-полоски"
      },
      {
        title: "Чет еще",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "Чет еще"
      },
      {
        title: "Экспресс-диагностика",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "Экспресс-диагностика"
      },
      {
        title: "Инсулиновые помпы",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "Инсулиновые помпы"
      },
      {
        title: "Расходные материалы",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "Расходные материалы"
      },
      {
        title: "Аксессуары и дополнительные устройства",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "Аксессуары и дополнительные устройства"
      },
      {
        title: "Xnjnj",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "Xnjnj"
      },
      {
        title: "асходные",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "асходные"
      },
      {
        title: "материалы",
        description: "писание продукта",
        imagePath: "/assets/img/zaglushka.png",
        category: "материалы"
      },
    ]
  }
}
