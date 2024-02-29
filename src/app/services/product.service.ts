import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable, catchError, delay, retry, tap } from 'rxjs';
import { BASE_URL } from 'global';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ICategory } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router) { }

  baseUrl: string = BASE_URL;
  jwt: string = this.authService.getToken() ?? '';
  products: IProduct[] = [
    {
      title: "",
      description: "",
      imagePath: "",
      category: {
        name: "",
        subcategories: []
      }
    }
  ]
  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/api/products`).pipe(
      delay(304),
      retry(2),
      tap(products => this.products = products)
    )
  }
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/api/products/${id}`).pipe(
      delay(304),
      retry(2)
    )
  }

  edit(item: IProduct, file: any, categoryId: string | undefined, subcategoryId?: string | undefined) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt,

    })

    let formData = new FormData();
    Object.keys(item).forEach((key: string) => {
      if(key !== 'categoryId' && key !== 'subcategoryId')
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })

    if (file) {
      formData.append(
        "image",
        file
      );
    }
    if (categoryId) {
      formData.append(
        "categoryId",
        categoryId
      );
    }
    if (subcategoryId) {
      formData.append(
        "subcategoryId",
        subcategoryId
      );
    }

    formData.forEach(item => console.log(item))

    return this.http.patch<IProduct>(`${this.baseUrl}/api/admin/products`, formData, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }

  create(item: IProduct, file: any, categoryId: string | undefined, subcategoryId?: string | undefined) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt,

    })

    let formData = new FormData();
    Object.keys(item).forEach((key: string) => {
      if(key !== 'categoryId' && key !== 'subcategoryId')
      formData.append(
        key,
        /* @ts-ignore */
        item[key]
      );
    })

    formData.append(
      "image",
      file
    );
    if (categoryId) {
      formData.append(
        "categoryId",
        categoryId
      );
    }
    if (subcategoryId) {
      console.log(subcategoryId)
      formData.append(
        "subcategoryId",
        subcategoryId
      );
    }

    return this.http.post<IProduct>(`${this.baseUrl}/api/admin/products`, formData, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }

  delete(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.delete<IProduct>(`${this.baseUrl}/api/admin/products?id=${id}`, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
}