import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { INewsItem } from 'src/app/models/news.model';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-panel-news',
  templateUrl: './admin-panel-news.component.html',
  styleUrls: ['./admin-panel-news.component.scss']
})

export class AdminPanelNewsComponent implements OnInit {
  @Input() title: string = '';
  @Input() typePanel: IPanelTypes = IPanelTypes.ItemCreate;
  @Input() news: INewsItem = {
    title: "",
    time: "",
    text: "",
    imagePath: ""
  }

  constructor(
    private router: Router,
    public newsService: NewsService,
    public authService: AuthService
  ) { }

  allTypesPanel = IPanelTypes;
  isLogin: boolean = this.authService.isLogin();
  isOpen: boolean = false;
  isOpenDelete: boolean = false;
  adminForm!: FormGroup;
  file?: File;
  messageErrorDate?: string;

  changeVisibility() {
    this.isOpen = !this.isOpen;
  }
  changeVisibilityDelete() {
    this.isOpenDelete = !this.isOpenDelete;
  }
  inputTime(e: any) {
    let input = e.target
    if (input.value.length == 4 && (e.keyCode !== 8 && e.keyCode !== 46)) {
      input.value = input.value + '-';
    } else if (input.value.length == 7 && (e.keyCode !== 8 && e.keyCode !== 46)) {
      input.value = input.value + '-';
    } else if (input.value.length == 10) {
      if (input.value.slice(5, 7) > 12) {
        this.messageErrorDate = "Месяц не может превышать 12"
      } else if (input.value.slice(8, 10) > 31) {
        this.messageErrorDate = "Число не может превышать 31"
      } else {
        this.messageErrorDate = undefined;
      }
    }
  }
  changeFile(e: any) {
    this.file = e.target.files[0];
  }

  submitCreate() {
    if (!this.adminForm.invalid) {
      this.newsService.create(this.adminForm.value, this.file!).subscribe(item => {
        this.newsService.news.unshift(item)
        this.changeVisibility();
        this.adminForm.reset();
      });
    }
  }
  submitEdit() {
    this.news.title = this.adminForm.controls['title'].value;
    this.news.time = this.adminForm.controls['time'].value;
    this.news.text = this.adminForm.controls['text'].value;
    this.newsService.edit(this.news, this.file ?? undefined).subscribe(item => {
      this.news = item;
    });
    this.changeVisibility();
  }

  delete() {
    this.newsService.delete(this.news.id!).subscribe()
    this.router.navigate(['/news'])
  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();

    this.adminForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      time: new FormControl("", [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]')]),
      text: new FormControl("", [Validators.required, Validators.minLength(2)]),
      image: new FormControl("", [Validators.required]),
      imageEdit: new FormControl("", []),
    })
  }
}