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
  news?: INewsItem[];
  allPanelTypes = IPanelTypes;
  isLoad: boolean = true;


  ngOnInit(): void {
    this.isLoad = true;
    this.newsService.getAll().pipe().subscribe(itemList => {
      this.isLoad = false;
      this.news = itemList.reverse()
    });
  }
}

