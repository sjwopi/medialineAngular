import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPanelTypes } from 'src/app/models/adminPanel.model';
import { INewsItem } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-item-page',
  templateUrl: './news-item-page.component.html',
  styleUrls: ['./news-item-page.component.scss']
})

export class NewsItemPageComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    public newsService: NewsService,
  ) { }
  id = this.activateRoute.snapshot.params["id"];
  news: INewsItem = {
    time: "",
    title: "",
    text: "",
    imagePath: ""
  }
  panelTypes = IPanelTypes;


  ngOnInit(): void {
    this.newsService.getById(this.id).pipe().subscribe(item => {
      this.news = item;
    })
  }
}
