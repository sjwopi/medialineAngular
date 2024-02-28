import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ModalResponseService } from 'src/app/services/modal-response.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public modalResponseService: ModalResponseService
  ) { }
  loginForm!: FormGroup;
  isLogin: boolean = false;

  logOut() {
    this.authService.logOut();
    window.location.reload()
  }
  submitLogin() {
    if (!this.loginForm.invalid) {
      this.modalResponseService.isOpenAfterSubmit = true
      this.modalResponseService.isLoad = true

      this.authService.login(this.loginForm.value).subscribe(item => {
        this.modalResponseService.setStatus(200);
        this.isLogin = this.authService.isLogin();
      }, (error) => {
        this.modalResponseService.setStatus(error.status);
      });
      this.loginForm.reset()
    }
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9]{3,}@[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    this.isLogin = this.authService.isLogin();
  }
}