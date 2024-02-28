import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory, ISubCategory } from 'src/app/models/categories.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModalResponseService } from 'src/app/services/modal-response.service';

@Component({
  selector: 'app-admin-panel-categories-edit',
  templateUrl: './admin-panel-categories-edit.component.html',
  styleUrls: ['../admin-panel-categories.component.scss']
})
export class AdminPanelCategoriesEditComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public categoriesService: CategoriesService,
    public modalResponseService: ModalResponseService
  ) { }

  adminFormEdit!: FormGroup;
  isOpenDelete: boolean = false;
  isEditWithParent: boolean = false;
  messageErrorNameTaken: string = "";

  catEdit?: ICategory;
  catSubEdit?: ISubCategory;
  catEditParent?: ICategory;


  checkNameTaken(name: string) {
    const inCat: boolean = this.categoriesService.categories.find(c => c.name.toLowerCase() == name.toLowerCase() && this.catEdit?.name.toLowerCase() != c.name.toLowerCase()) ? true : false;
    const inCatSub: boolean = this.categoriesService.categoriesSub.find(c => c.name.toLowerCase() == name.toLowerCase() && this.catSubEdit?.name.toLowerCase() != c.name.toLowerCase()) ? true : false;

    if (inCat || inCatSub) {
      this.messageErrorNameTaken = "Существующее имя."
      this.adminFormEdit.controls['category'].setValue('')
    } else {
      this.messageErrorNameTaken = ""
    }
  }

  changeVisibilityDelete() {
    this.isOpenDelete = !this.isOpenDelete;
  }

  changeEditParent() {
    const nameParent = this.adminFormEdit.controls['parentcategory'].value
    this.catEditParent = this.categoriesService.categories.find(c => c.name.toLowerCase() == nameParent.toLowerCase());
  }

  changeEditCategory() {
    const nameEdit = this.adminFormEdit.controls['editcategory'].value
    this.adminFormEdit.controls['category'].setValue(nameEdit)

    this.catEdit = this.categoriesService.categories.find(c => c.name.toLowerCase() == nameEdit.toLowerCase());
    this.catSubEdit = this.categoriesService.categoriesSub.find(c => c.name.toLowerCase() == nameEdit.toLowerCase());

    if (this.catSubEdit) {
      this.isEditWithParent = true;
      const oldParentName = this.categoriesService.categories.find(category => category.id == this.catSubEdit?.categoryId)?.name
      this.adminFormEdit.controls['parentcategory'].setValue(oldParentName);
      this.changeEditParent();
    } else {
      this.isEditWithParent = false;
    }
  }

  delete() {
    if (!this.adminFormEdit.invalid) {
      this.modalResponseService.isOpenAfterSubmit = true
      this.modalResponseService.isLoad = true

      if (this.catEditParent == this.categoriesService.categories[0] || !this.catEditParent) {
        this.categoriesService.deleteCat(this.catEdit?.id!).subscribe(() => {
          this.modalResponseService.setStatus(200);
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      } else if (this.catEditParent.id) {
        this.categoriesService.deleteSubCat(this.catSubEdit?.id!).subscribe(() => {
          this.modalResponseService.setStatus(200);
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      }
    }
  }

  submitEdit() {
    const newNameCategory = this.adminFormEdit.controls['category'].value
    this.checkNameTaken(newNameCategory)

    if (!this.adminFormEdit.invalid) {
      this.modalResponseService.isOpenAfterSubmit = true
      this.modalResponseService.isLoad = true

      /* если родитель "Все категории" либо не выбран */
      if (this.catEditParent == this.categoriesService.categories[0] || !this.catEditParent) {
        const item: ICategory = { id: this.catEdit?.id, name: newNameCategory, subcategories: [] }
        this.categoriesService.editCategory(item).subscribe(() => {
          this.modalResponseService.setStatus(200);
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      }
      /* если родитель выбран */
      else if (this.catEditParent.id) {
        const item: ISubCategory = { id: this.catSubEdit?.id, name: newNameCategory, categoryId: this.catEditParent.id }
        this.categoriesService.editSubCategory(item).subscribe(() => {
          this.modalResponseService.setStatus(200);
        }, (error) => {
          this.modalResponseService.setStatus(error.status);
        })
      }
    }
  }

  ngOnInit(): void {
    this.adminFormEdit = new FormGroup({
      editcategory: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      parentcategory: new FormControl('')
    })
  }
}
