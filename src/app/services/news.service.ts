import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, tap } from 'rxjs';
import { INewsItem } from 'src/app/models/news.model';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  constructor(private http: HttpClient) { }

  news: INewsItem[] = [
    {
      time: "",
      name: "",
      text: "",
      image: ""
    }
  ]

  getAll(): Observable<INewsItem[]> {
    return this.http.get<INewsItem[]>('http://localhost:3000/news').pipe(
      delay(304),
      retry(2),
      tap(news => this.news = news)
    )
  }
  getById(id: number): Observable<INewsItem> {
    return this.http.get<INewsItem>(`http://localhost:3000/news/${id}`).pipe(
      delay(304),
      retry(2)
    )
  }
  editNews(formData: INewsItem) {
    return this.http.patch<INewsItem[]>(`http://localhost:3000/news/${formData.id}`, formData).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
  createNews(item: INewsItem) {
    return this.http.post<INewsItem>('http://localhost:3000/news', item).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
  deleteNews(id: number) {
    return this.http.delete<INewsItem>(`http://localhost:3000/news/${id}`).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
}