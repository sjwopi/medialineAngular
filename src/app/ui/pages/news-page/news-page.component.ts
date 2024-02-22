import { Component, OnInit } from '@angular/core';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
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
  allPanelTypes = IPanelTypes;


  ngOnInit(): void {
    this.newsService.getAll().pipe().subscribe(itemList => {
      this.news = itemList.reverse()
    });
  }
}

