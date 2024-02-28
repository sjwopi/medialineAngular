import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ModalResponseService } from 'src/app/services/modal-response.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  questionsForm!: FormGroup;

  constructor(
    public feedbackService: FeedbackService,
    private recaptchaV3Service: ReCaptchaV3Service,
    public modalResponseService: ModalResponseService
  ) { }


  executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      this.questionsForm.controls['captchaToken'].setValue(token);
      this.submitFormQuestions();
    });
  }

  submitFormQuestions() {
    if (!this.questionsForm.invalid) {
      this.modalResponseService.isOpenAfterSubmit = true
      this.modalResponseService.isLoad = true
      this.feedbackService.createFeedback(this.questionsForm.value).subscribe(() => {
        this.modalResponseService.setStatus(200);
        this.questionsForm.reset();
      }, (error) => {
        this.modalResponseService.setStatus(error.status);
      })
    }
  }

  ngOnInit(): void {
    this.questionsForm = new FormGroup({
      'clientName': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required]),
      'captchaToken': new FormControl('', [])
    });
  }
}
