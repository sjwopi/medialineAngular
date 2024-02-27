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
  isOpenAfterSubmit: boolean = false;
  isComplete: boolean = false;
  messageAfterSubmit?: string;
  messageBtnAfterSubmit?: string;

  changeVisibilityAfterSubmit() {
    if(!this.isLoad) {
      document.body.classList.toggle('open')
      this.isOpenAfterSubmit = !this.isOpenAfterSubmit;
    }
  }

  submitLogin() {
    if (!this.loginForm.invalid) {
      this.changeVisibilityAfterSubmit();
      this.isLoad = true;

      this.authService.login(this.loginForm.value).subscribe(item => {
        this.isComplete = true
        this.messageAfterSubmit = 'Успешно!';
        this.messageBtnAfterSubmit = 'Продолжить';
        this.isLoad = false;
      }, (error) => {
        this.isComplete = false
        this.messageBtnAfterSubmit = 'Попробовать еще раз';
        switch (error.status) {
          case 403:
            this.messageAfterSubmit = 'Неверный логин или пароль!';
            break;
          case 500:
            this.messageAfterSubmit = 'Ошибка сервера!';
            break;
          default:
            this.messageAfterSubmit = 'Что-то пошло не так!';
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