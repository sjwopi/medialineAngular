import { Component, Input } from '@angular/core';
import { INewsItem } from 'src/app/models/news.model';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  @Input() news: INewsItem = {
    time: "",
    title: "",
    text: "",
    imagePath: ""
  }
}
