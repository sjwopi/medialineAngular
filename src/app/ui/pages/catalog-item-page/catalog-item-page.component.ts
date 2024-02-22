import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-item-page',
  templateUrl: './catalog-item-page.component.html',
  styleUrls: ['./catalog-item-page.component.scss']
})
export class CatalogItemPageComponent {
  id: number;
  product: IProduct = {
    title: "",
    description: "",
    imagePath: "",
    category: ""
  }

  constructor(private activateRoute: ActivatedRoute, public productsService: ProductService) {
    this.id = activateRoute.snapshot.params["id"];
  }



  ngOnInit(): void {
    /* this.productsService.getById(this.id).pipe().subscribe(item => {
      this.product = item;
    }) */
    this.product = {
      id: 1,
      title: "Продукт1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est \n laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.      ",
      imagePath: "/assets/img/zaglushka.png",
      category: "тип продукта 1",
      peculiarities: [
        "hfadsf",
        "asdf sdfasdfasg adfasf",
        "asdfasdfasfg asdfasd",
        "asdfasdf"
      ],
      equipment: [
        "hfadsf",
        "asdfasdf",
        "asdf sdfasdfasg adfasf",
        "asdfasdfasfg asdfasd",
        "asdfasdfasfg asdfasd",
      ]
    }
  }
}
