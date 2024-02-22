import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, retry, tap } from 'rxjs';
import { INewsItem } from 'src/app/models/news.model';
import { AuthService } from './auth.service';
import { BASE_URL } from 'global';
import { Router } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router) { }
  baseUrl: string = BASE_URL;
  jwt: string = this.authService.getToken() ?? '';
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
      retry(2),
      catchError(() => {
        this.router.navigate(['/news'])
        return [];
      })
    )
  }
  edit(item: INewsItem) {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.patch<INewsItem[]>(`${this.baseUrl}/admin/news`, item, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
  create(item: INewsItem, file: any) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt,
      
    })

    let formData = new FormData();

    formData.append(
      "news",
      new Blob([JSON.stringify(item)], {
        type: "application/json"
      })
    );
    formData.append(
      "image",
      new Blob([file], {
        type: 'multipart/form-data'
      })
    );

    return this.http.post<INewsItem>(`http://localhost:8080/api/admin/news`, formData, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
  delete(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.delete<INewsItem>(`${this.baseUrl}/admin/news?id=${id}`, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
}