import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory, ISubCategory } from 'src/app/models/categories.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModalResponseService } from 'src/app/services/modal-response.service';

@Component({
  selector: 'app-admin-panel-categories-create',
  templateUrl: './admin-panel-categories-create.component.html',
  styleUrls: ['../admin-panel-categories.component.scss']
})
export class AdminPanelCategoriesCreateComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public categoriesService: CategoriesService,
    public modalResponseService: ModalResponseService
  ) { }

  adminFormCreate!: FormGroup;
  catCreateParent?: ICategory;
  messageErrorNameTaken: string = "";

  checkNameTaken(name: string) {
    let inCat: boolean = this.categoriesService.categories.find(c => c.name.toLowerCase() == name.toLowerCase()) ? true : false;
    let inCatSub: boolean = this.categoriesService.categoriesSub.find(c => c.name.toLowerCase() == name.toLowerCase()) ? true : false;

    if (inCat || inCatSub) {
      this.messageErrorNameTaken = "Существующее имя."
      this.adminFormCreate.controls['category'].setValue('')
    } else {
      this.messageErrorNameTaken = ""
    }
  }

  changeParent() {
    const nameParent = this.adminFormCreate.controls['parentcategory'].value
    this.catCreateParent = this.categoriesService.categories.find(c => c.name.toLowerCase() == nameParent.toLowerCase());
  }

  addCategory() {
    const nameCategory = this.adminFormCreate.controls['category'].value
    this.checkNameTaken(nameCategory)

    if (!this.adminFormCreate.invalid) {
      this.modalResponseService.isOpenAfterSubmit = true
      this.modalResponseService.isLoad = true

      /* если родитель "Все категории" либо не выбран */
      if (this.catCreateParent == this.categoriesService.categories[0] || !this.catCreateParent) {
        const item: ICategory = { name: nameCategory, subcategories: [] }
        this.categoriesService.createCategory(item).subscribe(item => {
          this.modalResponseService.setStatus(200);
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      }
      /* если родитель выбран */
      else if (this.catCreateParent.id) {
        const item: ISubCategory = { name: nameCategory, categoryId: this.catCreateParent.id }
        this.categoriesService.createSubCategory(item).subscribe(item => {
          this.modalResponseService.setStatus(200);
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      }
    }
  }

  ngOnInit(): void {
    this.adminFormCreate = new FormGroup({
      category: new FormControl('', [Validators.required]),
      parentcategory: new FormControl('')
    })
  }
}
