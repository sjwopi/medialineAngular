import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, tap } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  user: IUser = {
    email: "",
    password: ""
  };

  setToken(user: IUser) {
    localStorage.setItem('IsAuthToken', JSON.stringify(user.token));
  }
  getToken() {
    return localStorage.getItem('IsAuthToken');
  }
  delToken() {
    localStorage.removeItem('IsAuthToken');
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }

  login(userInfo: IUser): Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:8080/api/admin/login`, userInfo).pipe(
      delay(200),
      retry(2),
      tap((user) => {
        this.user = user;
        console.log(user)
        localStorage.clear();
        this.setToken(this.user)
      })
    )
  }

}
