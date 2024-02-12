import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    name: "",
    text: "",
    image: ""
  }
  isLogin: boolean = true;
  controls: string[] = ["asdf", "asfd"]

  openDelete() {
    document.getElementById('deleteNews')!.classList.add('open')
  };
  closeDelete() {
    document.getElementById('deleteNews')!.classList.remove('open')
  };
  submitDelete() {
    this.newsService.deleteNews(this.news.id!).subscribe()
    this.closeDelete()
  }

  openEdit() {
    document.getElementById('editNews')!.classList.add('open')
  }
  closeEdit() {
    document.getElementById('editNews')!.classList.remove('open')
  }
  submitEdit() {
    if (!this.newsEditForm.invalid) {
      this.news.name = this.newsEditForm.controls["newsname"].value
      this.news.time = this.newsEditForm.controls["newstime"].value
      this.news.text = this.newsEditForm.controls["newstext"].value
      this.news.image = this.newsEditForm.controls["newsimage"].value
      this.newsService.editNews(this.news).subscribe()
      this.closeEdit();
    }
  }

  ngOnInit(): void {
    this.newsEditForm = new FormGroup({
      newsname: new FormControl("", [Validators.required]),
      newstime: new FormControl("", [Validators.required]),
      newstext: new FormControl("", [Validators.required]),
      newsimage: new FormControl("", [Validators.required]),
    });

    this.newsService.getById(this.id).pipe().subscribe(item => {
      this.news = item

      if (this.isLogin) {
        this.newsEditForm.controls["newsname"].setValue(item.name)
        this.newsEditForm.controls["newstime"].setValue(item.time)
        this.newsEditForm.controls["newstext"].setValue(item.text)
        this.newsEditForm.controls["newsimage"].setValue(item.image)
      }
    })


  }
}
