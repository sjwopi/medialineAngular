import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ICategory, ISubCategory } from 'src/app/models/categories.model';
import { ModalResponseService } from 'src/app/services/modal-response.service';

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
    category: {
      name: "",
      subcategories: []
    }
  }

  constructor(
    private router: Router,
    public productService: ProductService,
    public authService: AuthService,
    public categoriesService: CategoriesService,
    public modalResponseService: ModalResponseService
  ) { }

  allTypesPanel = IPanelTypes;
  isLogin: boolean = this.authService.isLogin();
  isOpen: boolean = false;
  isOpenDelete: boolean = false;
  adminForm!: FormGroup;
  file?: File;

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
      this.modalResponseService.isOpenAfterSubmit = true
      this.modalResponseService.isLoad = true
      const cat = this.categoriesService.categories.find(c => c.name.toLowerCase() == this.adminForm.controls['category'].value.toLowerCase());
      const catSub = this.categoriesService.categoriesSub.find(c => c.name.toLowerCase() == this.adminForm.controls['category'].value.toLowerCase());

      if (cat) {
        this.productService.create(this.adminForm.value, this.file, cat.id?.toString(), catSub?.id?.toString()).subscribe(item => {
          this.productService.products.push(item)
          this.modalResponseService.setStatus(200);
          this.changeVisibility();
          this.adminForm.reset();
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      } else if (catSub) {
        this.productService.create(this.adminForm.value, this.file, catSub.categoryId.toString(), catSub.id?.toString()).subscribe(item => {
          this.productService.products.push(item)
          this.modalResponseService.setStatus(200);
          this.changeVisibility();
          this.adminForm.reset();
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      }
    }
  }
  submitEdit() {
    if (!this.adminForm.invalid || this.adminForm.get('image')?.['errors']?.['required']) {
      const cat = this.categoriesService.categories.find(c => c.name.toLowerCase() == this.adminForm.controls['category'].value.toLowerCase());
      const catSub = this.categoriesService.categoriesSub.find(c => c.name.toLowerCase() == this.adminForm.controls['category'].value.toLowerCase());

      this.modalResponseService.isOpenAfterSubmit = true
      this.modalResponseService.isLoad = true

      this.product.title = this.adminForm.controls['title'].value;
      this.product.description = this.adminForm.controls['description'].value;
      this.product.packaging = this.adminForm.controls['packaging'].value;
      this.product.specials = this.adminForm.controls['specials'].value;
      this.product.title = this.adminForm.controls['title'].value;

      if (cat) {
        this.productService.edit(this.product, this.file, cat.id?.toString(), catSub?.id?.toString()).subscribe(item => {
          this.productService.products.push(item)
          this.changeVisibility();
          this.adminForm.reset();
          this.modalResponseService.setStatus(200);
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      } else if (catSub) {
        this.productService.edit(this.product, this.file, catSub.categoryId.toString(), catSub.id?.toString()).subscribe(item => {
          this.productService.products.push(item)
          this.modalResponseService.setStatus(200);
          this.changeVisibility();
          this.adminForm.reset();
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      }
    }
  }

  delete() {
    this.productService.delete(this.product.id!).subscribe()
    this.productService.products.filter((item) => {
      return item.id == this.product.id;
    })
    this.router.navigate(['/product'])
  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      description: new FormControl("", [Validators.required, Validators.minLength(2)]),
      packaging: new FormControl("", [Validators.minLength(2)]),
      specials: new FormControl("", [Validators.minLength(2)]),
      category: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
      imageEdit: new FormControl("", []),
    })

    this.categoriesService.getCategory().subscribe()

    if (this.typePanel == this.allTypesPanel.ItemEdit) {
      this.adminForm.controls["title"].setValue(this.product.title)
      this.adminForm.controls["description"].setValue(this.product.description)
      this.adminForm.controls["packaging"].setValue(this.product.packaging)
      this.adminForm.controls["specials"].setValue(this.product.specials)
      const categoryProduct = this.product.subcategory ? this.product.subcategory.name : this.product.category.name
      this.adminForm.controls["category"].setValue(categoryProduct)
    }
  }
}
