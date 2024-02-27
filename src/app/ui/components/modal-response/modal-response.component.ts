import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-response',
  templateUrl: './modal-response.component.html',
  styleUrl: './modal-response.component.scss'
})
export class ModalResponseComponent {
  @Input() isOpenAfterSubmit: boolean = true;
  @Input() isLoad: boolean = false;
  @Input() isComplete: boolean = false;
  @Input() messageAfterSubmit: string = "";
  @Input() messageBtnAfterSubmit: string = "";
  
  changeVisibilityAfterSubmit() {
    document.body.classList.toggle('open')
    this.isOpenAfterSubmit = !this.isOpenAfterSubmit;
  }
}
