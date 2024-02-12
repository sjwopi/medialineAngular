import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  questionsForm!: FormGroup;
  //messageErr: string = "";
  //isLoad: boolean = true;

  constructor(
    /* private router: Router, */
    /* public authService: AuthService */
  ) { }

  submitFormQuestions() {
    console.log("asdfasf")
  }

  ngOnInit(): void {
    this.questionsForm = new FormGroup({
      'clientname': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required])
    });
  }
}
