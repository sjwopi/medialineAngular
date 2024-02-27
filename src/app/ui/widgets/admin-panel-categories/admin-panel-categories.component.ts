import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory, ISubCategory } from 'src/app/models/categories.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-admin-panel-categories',
  templateUrl: './admin-panel-categories.component.html',
  styleUrls: ['./admin-panel-categories.component.scss']
})
export class AdminPanelCategoriesComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public categoriesService: CategoriesService
  ) { }

  messageError: string = "";
  messageErrorEdit: string = "";
  isLogin: boolean = this.authService.isLogin();
  isOpen: boolean = false;
  isOpenDelete: boolean = false;
  categories: ICategory[] = this.categoriesService.categories;
  categoriesAll: ICategory[] = [];
  adminFormCreate!: FormGroup;
  adminFormEdit!: FormGroup;

  changeVisibility() {
    this.isOpen = !this.isOpen;
  }
  changeVisibilityDelete() {
    this.isOpenDelete = !this.isOpenDelete;
  }
  changeEditCategory() {
    const nameEdit = this.adminFormEdit.controls['editcategory'].value
    this.adminFormEdit.controls['category'].setValue(nameEdit)
    const parentId = this.categories.find(category => category.name === nameEdit)?.categoryId

    if (parentId) {
      const parentName = this.categories.find(category => category.id == parentId)
      this.adminFormEdit.controls['parentcategory'].setValue(parentName!.name);
    }
  }

  addCategory() {
    const nameParent = this.adminFormCreate.controls['parentcategory'].value
    const name = this.adminFormCreate.controls['category'].value

    if (this.categoriesAll.find(category => category.name.toLowerCase() === name.toLowerCase())) {
      this.messageError = "Существующее имя."
      return;
    } else {
      this.messageError = ""
    }

    if (!this.adminFormCreate.invalid) {
      if (nameParent == this.categories[0].name || !nameParent) {
        const item: ICategory = { name: name }
        this.categoriesService.createCategory(item).subscribe(item => {
          this.categories.push(item)
          this.categoriesAll.push(item)
        })

      } else {
        const parentId = this.categories.find(category => category.name.toLowerCase() === nameParent.toLowerCase())?.id

        if (parentId) {
          const item: ISubCategory = { name: name, categoryId: parentId }
          this.categoriesService.createSubCategory(item).subscribe(item => {
            this.categoriesAll.push(item)
          })
        } else {
          /* any */
        }
      }
    }
  }

  submitEdit() {
    const nameParent = this.adminFormEdit.controls['parentcategory'].value
    const name = this.adminFormEdit.controls['category'].value

    if (this.categoriesAll.find(category => category.name.toLowerCase() === name.toLowerCase() && name.toLowerCase() != this.adminFormEdit.controls['editcategory'].value.toLowerCase())) {
      this.messageErrorEdit = "Существующее имя."
      return;
    } else {
      this.messageErrorEdit = ""
    }

    if (!this.adminFormEdit.invalid) {
      if (nameParent == this.categories[0].name || !nameParent) {
        const newParent = this.adminFormEdit.controls['parentcategory'].value
        const newParentId = this.categories.find(category => {
          return category.name == newParent
        })?.id

        const nameId = this.categoriesAll.find(category => category.name == name)?.id
        const item: ICategory = { id: nameId, name: name, categoryId: newParentId }
        console.log(item)
        this.categoriesService.editCategory(item).subscribe(item => {
        })
      } else {

      }
    }
  }

  ngOnInit(): void {
    this.categoriesService.getCategory().subscribe(items => {
      this.categories = new Array(...items)
      this.categoriesAll = new Array(...items)

      items.forEach(item => {
        item.subcategories?.forEach(subCat => {
          this.categoriesAll.push(subCat)
        })
      })
      console.log(this.categoriesAll)
    })


    this.adminFormCreate = new FormGroup({
      category: new FormControl('', [Validators.required]),
      parentcategory: new FormControl('')
    })

    this.adminFormEdit = new FormGroup({
      editcategory: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      parentcategory: new FormControl('')
    })
  }
}
