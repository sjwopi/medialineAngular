import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable, catchError, delay, retry, tap } from 'rxjs';
import { BASE_URL } from 'global';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ICategory, ISubCategory } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router) { }

  baseUrl: string = BASE_URL;
  jwt: string = this.authService.getToken() ?? '';
  categories: ICategory[] = []

  getCategory(): Observable<ICategory[]> {
    return this.http.get<any>(`${this.baseUrl}/category`).pipe(
      delay(304),
      retry(2),
      tap(categories => this.categories = categories)
    )
  }

  createCategory(item: ICategory): Observable<ICategory> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    let formData = new FormData();
    Object.keys(item).forEach((key: string)=> {
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })
    return this.http.post<ICategory>(`${this.baseUrl}/admin/category`, formData, { headers }).pipe(
      delay(304),
      retry(2)
    )
  }

  editCategory(item: ICategory): Observable<ICategory> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    let formData = new FormData();
    Object.keys(item).forEach((key: string)=> {
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })
    return this.http.patch<ICategory>(`${this.baseUrl}/admin/category`, formData, { headers }).pipe(
      delay(304),
      retry(2)
    )
  }

  createSubCategory(item: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    let formData = new FormData();
    Object.keys(item).forEach((key: string)=> {
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })
    return this.http.post<any>(`${this.baseUrl}/admin/subcategory`, formData, { headers }).pipe(
      delay(304),
      retry(2)
    )
  }

  editSubCategory(item: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    let formData = new FormData();
    Object.keys(item).forEach((key: string)=> {
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })
    return this.http.patch<any>(`${this.baseUrl}/admin/subcategory`, formData, { headers }).pipe(
      delay(304),
      retry(2)
    )
  }
}
