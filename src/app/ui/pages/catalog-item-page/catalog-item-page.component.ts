import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
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
    category: {
      name: "",
      subcategories:[]
    }
  }
  allPanelTypes = IPanelTypes;
  isComplete: boolean = false;

  constructor(private activateRoute: ActivatedRoute, public productsService: ProductService) {
    this.id = activateRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.productsService.getById(this.id).pipe().subscribe(item => {
      this.product = item;
      this.isComplete = true
    })
  }
}
