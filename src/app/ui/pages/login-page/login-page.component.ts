import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  messageErr: string = "";
  isLoad: boolean = true;

  constructor(
    public authService: AuthService
  ) { }

  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe()
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
}