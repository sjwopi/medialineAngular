import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ICategory } from 'src/app/models/categories.model';

@Component({
  selector: 'app-admin-panel-product',
  templateUrl: './admin-panel-product.component.html',
  styleUrls: ['./admin-panel-product.component.scss']
})
export class AdminPanelProductComponent implements OnInit {
  @Input() title: string = '';
  @Input() typePanel: IPanelTypes = IPanelTypes.ItemCreate;
  @Input() product: IProduct = {
    title: "",
    description: "",
    imagePath: "",
    category: ""
  }

  constructor(
    private router: Router,
    public productService: ProductService,
    public authService: AuthService,
    public categoriesService: CategoriesService
  ) { }

  allTypesPanel = IPanelTypes;
  isLogin: boolean = this.authService.isLogin();
  isOpen: boolean = false;
  isOpenDelete: boolean = false;
  adminForm!: FormGroup;
  file?: File;
  categories: ICategory[] = []

  changeVisibility() {
    this.isOpen = !this.isOpen;
  }
  changeVisibilityDelete() {
    this.isOpenDelete = !this.isOpenDelete;
  }
  changeFile(e: any) {
    this.file = e.target.files[0];
  }

  submitCreate() {
    if (!this.adminForm.invalid) {
      const catId = this.categories.find(cat => cat.name === this.adminForm.controls['categoryId'].value)?.id
      if (catId) {
        this.adminForm.controls['categoryId'].setValue(catId);
      }

      this.productService.create(this.adminForm.value, this.file).subscribe(item => {
        this.productService.products.push(item)
        this.changeVisibility();
        this.adminForm.reset();
      });
    }
  }
  submitEdit() {
    this.product.title = this.adminForm.controls['title'].value;
    /*   this.product.time = this.adminForm.controls['time'].value;
      this.product.text = this.adminForm.controls['text'].value; */
    this.product.imagePath = this.adminForm.controls['imagePath'].value;
    this.productService.edit(this.product).subscribe();
    this.changeVisibility();
  }

  delete() {
    this.productService.delete(this.product.id!).subscribe()
    this.productService.products.filter((item) => {
      return item.id == this.product.id;
    })
    this.router.navigate(['/news'])
  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      /* time: new FormControl("", [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]')]), */
      description: new FormControl("", [Validators.required, Validators.minLength(2)]),
      packaging: new FormControl("", [Validators.minLength(2)]),
      specials: new FormControl("", [Validators.minLength(2)]),
      categoryId: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
      imagePath: new FormControl("", []),
    })

    this.categoriesService.getCategory().subscribe(items => this.categories = items)

    /*   if (this.isLogin && this.typePanel == this.allTypesPanel.ItemEdit) {
        this.adminForm.controls["title"].setValue(this.product.title)
              this.adminForm.controls["time"].setValue(this.product.time)
              this.adminForm.controls["text"].setValue(this.product.text)
        this.adminForm.controls["imagePath"].setValue(this.product.imagePath)
      } */
  }
}
