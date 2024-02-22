import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { INewsItem } from 'src/app/models/news.model';
import { FileUploader } from 'ng2-file-upload';

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
    public newsService: NewsService
  ) { }

  allTypesPanel = IPanelTypes;
  isLogin: boolean = true;
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
    console.log(e.target.files[0])
    this.file = e.target.files[0];
  }

  submitCreate() {
    console.log(this.adminForm.controls['imagePath'].value)

    if (!this.adminForm.invalid) {
      this.newsService.create(this.adminForm.value, this.file!).subscribe(item => {
        this.newsService.news.unshift(item)
        this.changeVisibility();
        this.adminForm.reset();

        console.log(item)
      });
    }
  }
  submitEdit() {
    this.news.title = this.adminForm.controls['title'].value;
    this.news.time = this.adminForm.controls['time'].value;
    this.news.text = this.adminForm.controls['text'].value;
    this.news.imagePath = this.adminForm.controls['imagePath'].value;
    this.newsService.edit(this.news).subscribe();
    this.changeVisibility();
  }

  delete() {
    this.newsService.delete(this.news.id!).subscribe()
    this.newsService.news.filter((item) => {
      return item.id == this.news.id;
    })
    this.router.navigate(['/news'])
  }

  inputTime(e: any) {
    let input = e.target
    if (input.value.length == 4 && (e.keyCode !== 8 && e.keyCode !== 46)) {
      input.value = input.value + '-';
    } else if (input.value.length == 7 && (e.keyCode !== 8 && e.keyCode !== 46)) {
      input.value = input.value + '-';
    }
  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      time: new FormControl("", [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]')]),
      text: new FormControl("", [Validators.required, Validators.minLength(2)]),
      imagePath: new FormControl("", [Validators.required]),
    })

    //this.file = 

    if (this.isLogin && this.typePanel == this.allTypesPanel.ItemEdit) {
      this.adminForm.controls["title"].setValue(this.news.title)
      this.adminForm.controls["time"].setValue(this.news.time)
      this.adminForm.controls["text"].setValue(this.news.text)
      this.adminForm.controls["imagePath"].setValue(this.file)
    }
  }
}