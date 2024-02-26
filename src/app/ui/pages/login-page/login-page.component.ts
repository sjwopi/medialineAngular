import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }

  loginForm!: FormGroup;
  messageErr: string = "";
  isLoad: boolean = false;
  isOpenComplete: boolean = false;
  isComplete: boolean = false;
  messageAfterLogin?: string;
  messageBtnAfterLogin?: string;

  changeVisibilityComplete() {
    document.body.classList.toggle('open')
    this.isOpenComplete = !this.isOpenComplete;
  }

  submitLogin() {
    if (!this.loginForm.invalid) {
      this.isLoad = true;
      this.changeVisibilityComplete();

      this.authService.login(this.loginForm.value).subscribe(item => {
        this.isComplete = true
        this.messageAfterLogin = 'Успешно!';
        this.messageBtnAfterLogin = 'Продолжить';
        this.isLoad = false;
      }, (error) => {
        this.isComplete = false
        this.messageBtnAfterLogin = 'Попробовать еще раз';
        switch (error.status) {
          case 403:
            this.messageAfterLogin = 'Неверный логин или пароль!';
            break;
          case 500:
            this.messageAfterLogin = 'Ошибка сервера!';
            break;
          default:
            this.messageAfterLogin = 'Что-то пошло не так!';
        }
        this.isLoad = false;
      });
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9]{3,}@[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
}