import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory, ISubCategory } from 'src/app/models/categories.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModalResponseService } from 'src/app/services/modal-response.service';

@Component({
  selector: 'app-admin-panel-categories',
  templateUrl: './admin-panel-categories.component.html',
  styleUrls: ['./admin-panel-categories.component.scss']
})
export class AdminPanelCategoriesComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public categoriesService: CategoriesService,
    public modalResponseService: ModalResponseService
  ) { }

  isLogin: boolean = this.authService.isLogin();
  isOpenPanel: boolean = false;
  isCompleteGet: boolean = false;

  changeVisibility() {
    this.isOpenPanel = !this.isOpenPanel;
  }

  ngOnInit(): void {
    this.categoriesService.getCategory().subscribe(() => this.isCompleteGet = true)
  }
}
