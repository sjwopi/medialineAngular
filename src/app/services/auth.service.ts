import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, tap } from 'rxjs';
import { IUser } from '../models/user.model';
import { BASE_URL } from 'global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  user: IUser = {
    email: "",
    password: ""
  };
  baseUrl: string = BASE_URL;

  setToken(user: IUser) {
    localStorage.setItem('Time', (+new Date() + (3600 * 1000 * 24)).toString());
    localStorage.setItem('IsAuthToken', JSON.stringify(user.token));
  }

  getToken() {
    return JSON.parse(localStorage.getItem('IsAuthToken')!);
  }
  
  isLogin() {
    if (parseInt(JSON.parse(localStorage.getItem('Time')!)) >= +new Date() && JSON.parse(localStorage.getItem('IsAuthToken') ?? '') != '') {
      return true;
    }
    localStorage.clear;
    return false;
  }

  delToken() {
    localStorage.removeItem('IsAuthToken');
  }

  logOut() {
    localStorage.clear();
  }

  login(userInfo: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}/api/admin/login`, userInfo).pipe(
      delay(200),
      retry(2),
      tap((user) => {
        this.user = user;
        localStorage.clear();
        this.setToken(this.user)
      })
    )
  }

}
