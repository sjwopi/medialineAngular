import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-admin-panel-product',
  templateUrl: './admin-panel-product.component.html',
  styleUrls: ['./admin-panel-product.component.scss']
})
export class AdminPanelProductComponent implements OnInit{
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
    public productService: ProductService
  ) { }

  allTypesPanel = IPanelTypes;
  isLogin: boolean = true;
  isOpen: boolean = false;
  isOpenDelete: boolean = false;
  adminForm!: FormGroup;

  changeVisibility() {
    this.isOpen = !this.isOpen;
  }
  changeVisibilityDelete() {
    this.isOpenDelete = !this.isOpenDelete;
  }

  submitCreate() {
    if (!this.adminForm.invalid) {
      this.adminForm.controls['imagePath'].setValue('/assets/img/zaglushka.png')
      this.productService.create(this.adminForm.value).subscribe(item => {
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
      time: new FormControl("", [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]')]),
      text: new FormControl("", [Validators.required, Validators.minLength(2)]),
      imagePath: new FormControl("", [Validators.required]),
    })

    if (this.isLogin && this.typePanel == this.allTypesPanel.ItemEdit) {
      this.adminForm.controls["title"].setValue(this.product.title)
/*       this.adminForm.controls["time"].setValue(this.product.time)
      this.adminForm.controls["text"].setValue(this.product.text) */
      this.adminForm.controls["imagePath"].setValue(this.product.imagePath)
    }
  }
}
