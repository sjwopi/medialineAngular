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
  categoriesSub: ISubCategory[] = [];
  categoriesAll: ICategory[] = [];
  adminFormCreate!: FormGroup;
  adminFormEdit!: FormGroup;
  isEditWithParent: boolean = false;

  changeVisibility() {
    this.isOpen = !this.isOpen;
  }
  changeVisibilityDelete() {
    this.isOpenDelete = !this.isOpenDelete;
  }
  changeEditCategory() {
    const nameEdit = this.adminFormEdit.controls['editcategory'].value
    this.adminFormEdit.controls['category'].setValue(nameEdit)
    const cat = this.categoriesAll.find(category => category.name == nameEdit)
    const parentId = this.categories.find(category => category.id == cat?.categoryId)?.id
    this.isEditWithParent = false;

    if (parentId) {
      this.isEditWithParent = true;
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
      if (!nameParent) {
        const nameEdit = this.adminFormEdit.controls['editcategory'].value
        const nameId = this.categories.find(category => category.name == nameEdit)?.id
        const item: ICategory = { id: nameId, name: name }
        this.categoriesService.editCategory(item).subscribe()
      } else {
        const nameEdit = this.adminFormEdit.controls['editcategory'].value
        const nameId = this.categoriesSub.find(category => category.name == nameEdit)?.id
        const parentId = this.categories.find(category => category.name == nameParent)?.id
        console.log(parentId)
        if (parentId) {
          const item: any = { id: nameId, name: name, categoryId: parentId}
          this.categoriesService.editSubCategory(item).subscribe()
        }
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
          this.categoriesSub.push(subCat)
        })
      })
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
