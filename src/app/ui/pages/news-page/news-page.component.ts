import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IControls, IPanelItemTypes, IPanelTypes } from 'src/app/models/adminPanel.model';
import { INewsItem } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  constructor(
    public newsService: NewsService
  ) {}

  news: INewsItem[] = this.newsService.news
  newsItem: INewsItem = {
    time: "",
    title: "",
    text: "",
    imagePath: ""
  }
  isLogin: boolean = true;
  newsCreateForm!: FormGroup;


  openCreate() {
    document.getElementById('createNews')!.classList.add('open')
  }
  closeCreate() {
    document.getElementById('createNews')!.classList.remove('open')
  }
  submitCreate() {
    if (!this.newsCreateForm.invalid) {
      this.newsItem.title = this.newsCreateForm.controls["newsname"].value
      this.newsItem.time = "2018-09-04"
      this.newsItem.text = this.newsCreateForm.controls["newstext"].value
      this.newsItem.imagePath = '/assets/img/news-img.png';
      this.newsService.createNews(this.newsItem).subscribe()
      this.closeCreate();
    }
  }



  adminPanelControls: IControls[] = [
    {
      control: "newsTitle",
      placeholder: "Заголовок новости",
      type: "text"
    },
    {
      control: "newsTime",
      placeholder: "Дата",
      type: "text"
    },
    {
      control: "newsText",
      placeholder: "Содержание",
      type: "textarea"
    },
    {
      control: "newsImage",
      placeholder: "",
      type: "text"
    }]
  adminPanelType: IPanelTypes = IPanelTypes.ItemCreate;
  adminPanelItemType: IPanelItemTypes = IPanelItemTypes.INewsItem


  ngOnInit(): void {
    this.newsService.getAll().pipe().subscribe();

    this.newsCreateForm = new FormGroup({
      newsname: new FormControl("", [Validators.required]),
      newstime: new FormControl("", [Validators.required]),
      newstext: new FormControl("", [Validators.required]),
      newsimage: new FormControl("", []),
    });
  }
}

