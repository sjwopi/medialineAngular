import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IControls, IPanelItemTypes, IPanelTypes } from 'src/app/models/adminPanel.model';
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
    public newsService: NewsService
  ) { }
  newsEditForm!: FormGroup;
  id = this.activateRoute.snapshot.params["id"];
  news: INewsItem = {
    time: "",
    title: "",
    text: "",
    imagePath: ""
  }
  adminPanelControls: IControls[] = [
    {
      control: "title",
      placeholder: "Заголовок новости",
      type: "text"
    },
    {
      control: "time",
      placeholder: "Дата",
      type: "text"
    },
    {
      control: "text",
      placeholder: "Содержание",
      type: "textarea"
    },
    {
      control: "imagePath",
      placeholder: "",
      type: "text"
    }]

  adminPanelType: IPanelTypes = IPanelTypes.ItemEdit;

  adminPanelItemType: IPanelItemTypes = IPanelItemTypes.INewsItem


  ngOnInit(): void {
    /*   this.newsEditForm = new FormGroup({
        newsname: new FormControl("", [Validators.required]),
        newstime: new FormControl("", [Validators.required]),
        newstext: new FormControl("", [Validators.required]),
        newsimage: new FormControl("", [Validators.required]),
      }); */

    this.newsService.getById(this.id).pipe().subscribe(item => {
      this.news = item


      /* if (this.isLogin) {
        this.newsEditForm.controls["newsname"].setValue(item.title)
        this.newsEditForm.controls["newstime"].setValue(item.time)
        this.newsEditForm.controls["newstext"].setValue(item.text)
        this.newsEditForm.controls["newsimage"].setValue(item.imagePath)
      } */
    })


  }
}
