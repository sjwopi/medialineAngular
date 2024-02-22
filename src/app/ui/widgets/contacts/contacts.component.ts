import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  questionsForm!: FormGroup;

  constructor(
    public feedbackService: FeedbackService
  ) { }

  submitFormQuestions() {
    if (!this.questionsForm.invalid) {
      console.log(this.questionsForm.value)
      this.feedbackService.createFeedback(this.questionsForm.value).subscribe()
    }
  }

  ngOnInit(): void {
    this.questionsForm = new FormGroup({
      'clientName': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required])
    });
  }
}
