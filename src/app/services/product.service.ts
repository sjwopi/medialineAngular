import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable, delay, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  baseUrl: string =  'http://localhost:8080/api';
  /* baseUrl: string =  'http://localhost:3000/'; */
  products: IProduct[] = [
    {
      title: "",
      description: "",
      imagePath: "",
      category: "",
    }
  ]

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/products/all`).pipe(
      delay(304),
      retry(2),
      tap(products => this.products = products)
    )
  }
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`).pipe(
      delay(304),
      retry(2)
    )
  }
}