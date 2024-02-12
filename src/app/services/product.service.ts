import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable, delay, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  products: IProduct[] = [
    {
      name: "",
      text: "",
      image: "",
      type: "",
    }
  ]

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/products').pipe(
      delay(304),
      retry(2),
      tap(products => this.products = products)
    )
  }
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`).pipe(
      delay(304),
      retry(2)
    )
  }
}