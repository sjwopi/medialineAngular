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
  categories: ICategory[] = [];
  categoriesSub: ISubCategory[] = [];
  categoriesAll: (ICategory | ISubCategory)[] = [];

  getCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/api/category`).pipe(
      delay(304),
      retry(2),
      tap(items => {
        this.categories = items
        this.categoriesAll = new Array(...items)

        this.categories.forEach(item => {
          item.subcategories?.forEach(subCat => {
            this.categoriesSub.push(subCat)
            this.categoriesAll.push(subCat)
          })
        })
      }
      ))
  }

  createCategory(item: ICategory): Observable<ICategory> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    let formData = new FormData();
    Object.keys(item).forEach((key: string) => {
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })
    return this.http.post<ICategory>(`${this.baseUrl}/api/admin/category`, formData, { headers }).pipe(
      delay(304),
      retry(2)
    )
  }

  editCategory(item: ICategory): Observable<ICategory> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    let formData = new FormData();
    Object.keys(item).forEach((key: string) => {
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })
    return this.http.patch<ICategory>(`${this.baseUrl}/api/admin/category`, formData, { headers }).pipe(
      delay(304),
      retry(2)
    )
  }

  createSubCategory(item: ISubCategory): Observable<ISubCategory> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    let formData = new FormData();
    Object.keys(item).forEach((key: string) => {
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })
    return this.http.post<ISubCategory>(`${this.baseUrl}/api/admin/subcategory`, formData, { headers }).pipe(
      delay(304),
      retry(2)
    )
  }

  editSubCategory(item: ISubCategory): Observable<ISubCategory> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    let formData = new FormData();
    Object.keys(item).forEach((key: string) => {
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })
    return this.http.patch<ISubCategory>(`${this.baseUrl}/api/admin/subcategory`, formData, { headers }).pipe(
      delay(304),
      retry(2)
    )
  }

  deleteCat(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.delete<ICategory>(`${this.baseUrl}/api/admin/category?id=${id}`, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }

  deleteSubCat(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.delete<ISubCategory>(`${this.baseUrl}/api/admin/subcategory?id=${id}`, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
}
