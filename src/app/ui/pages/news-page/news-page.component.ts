import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  newsCreateForm!: FormGroup;
  newsItem: INewsItem = {
    time: "",
    name: "",
    text: "",
    image: ""
  }
  isLogin: boolean = true;


  openCreate() {
    document.getElementById('createNews')!.classList.add('open')
  }
  closeCreate() {
    document.getElementById('createNews')!.classList.remove('open')
  }
  submitCreate() {
    if (!this.newsCreateForm.invalid) {
      this.newsItem.name = this.newsCreateForm.controls["newsname"].value
      this.newsItem.time = this.newsCreateForm.controls["newstime"].value
      this.newsItem.text = this.newsCreateForm.controls["newstext"].value
      this.newsItem.image = this.newsCreateForm.controls["newsimage"].value
      this.newsService.createNews(this.newsItem).subscribe()
      this.closeCreate();
    }
  }

  ngOnInit(): void {
    this.newsService.getAll().pipe().subscribe()

    this.newsCreateForm = new FormGroup({
      newsname: new FormControl("", [Validators.required]),
      newstime: new FormControl("", [Validators.required]),
      newstext: new FormControl("", [Validators.required]),
      newsimage: new FormControl("", [Validators.required]),
    });
  }
}

