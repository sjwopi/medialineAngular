import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, tap } from 'rxjs';
import { INewsItem } from 'src/app/models/news.model';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  constructor(private http: HttpClient) { }
  baseUrl: string =  'http://localhost:8080/api';
  /* baseUrl: string =  'http://localhost:3000/'; */
  jwt: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLnJ1Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA4MDgwMjgyLCJleHAiOjE3MDgxNjY2ODJ9.oYjj1pXHm55c75rCrHolTG7wTY5THCSDuaLx9oUT37c';
  news: INewsItem[] = [
    {
      time: "",
      title: "",
      text: "",
      imagePath: ""
    }
  ]

  getAll(): Observable<INewsItem[]> {
    return this.http.get<INewsItem[]>(`${this.baseUrl}/news`).pipe(
      delay(304),
      retry(2),
      tap(news => this.news = news)
    )
  }
  getById(id: number): Observable<INewsItem> {
    return this.http.get<INewsItem>(`${this.baseUrl}/news/${id}`).pipe(
      delay(304),
      retry(2)
    )
  }
  editNews(item: INewsItem) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.patch<INewsItem[]>(`${this.baseUrl}/admin/news/${item.id}`, item, {headers}).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
  createNews(item: INewsItem) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.post<INewsItem>(`http://localhost:8080/api/admin/news`, item, {headers}).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
  deleteNews(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.delete<INewsItem>(`${this.baseUrl}/admin/news/${id}`, {headers}).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
}