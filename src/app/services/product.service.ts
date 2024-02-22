import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable, catchError, delay, retry, tap } from 'rxjs';
import { BASE_URL } from 'global';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router) { }

  baseUrl: string =  BASE_URL;
  jwt: string = this.authService.getToken() ?? '';
  products: IProduct[] = [
    {
      title: "",
      description: "",
      imagePath: "",
      category: "",
    }
  ]

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/products`).pipe(
      delay(304),
      retry(2),
      tap(products => this.products = products)
    )
  }
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`).pipe(
      delay(304),
      retry(2),
      catchError(() => {
        this.router.navigate(['/products'])
        return [];
      })
    )
  }
  edit(item: IProduct) {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.patch<IProduct[]>(`${this.baseUrl}/admin/products`, item, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
  create(item: IProduct) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.post<IProduct>(`http://localhost:8080/api/admin/products`, item, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
  delete(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.jwt
    })
    return this.http.delete<IProduct>(`${this.baseUrl}/admin/products?id=${id}`, { headers }).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
}