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

  isLogin: boolean = this.authService.isLogin();
  isOpen: boolean = false;
  isOpenDelete: boolean = false;
  categories: ICategory[] = this.categoriesService.categories;
  adminFormCreate!: FormGroup;
  adminFormEdit!: FormGroup;

  changeVisibility() {
    this.isOpen = !this.isOpen;
  }
  changeVisibilityDelete() {
    this.isOpenDelete = !this.isOpenDelete;
  }
  addCategory() {
    if (!this.adminFormCreate.invalid) {
      const nameParent = this.adminFormCreate.controls['parentcategory'].value
      const name = this.adminFormCreate.controls['category'].value
      
      if (nameParent == this.categories[0].name || !nameParent) {
        const item: ICategory = { name: name }
        console.log(item)
        this.categoriesService.createCategory(item).subscribe()

      } else {
        const parentId = this.categories.find(category => category.name === nameParent)?.id
        console.log("asdf")
        if (parentId) {
          const item: ISubCategory = { name: name, categoryId: parentId }
          this.categoriesService.createSubCategory(item).subscribe()
        } else {
          /* any */
        }
      }
    }
  }

  ngOnInit(): void {
    this.categoriesService.getCategory().subscribe(items => this.categories = items)

    this.adminFormCreate = new FormGroup({
      category: new FormControl(''),
      parentcategory: new FormControl('')
    })

    this.adminFormEdit = new FormGroup({
      category: new FormControl(''),
      parentcategory: new FormControl('')
    })
  }
}
