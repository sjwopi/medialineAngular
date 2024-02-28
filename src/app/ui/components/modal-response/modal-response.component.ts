import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ModalResponseService } from 'src/app/services/modal-response.service';

@Component({
  selector: 'app-modal-response',
  templateUrl: './modal-response.component.html',
  styleUrl: './modal-response.component.scss'
})
export class ModalResponseComponent {
  constructor(
    public resService: ModalResponseService
  ) { }
  @Input() isBack: boolean = false;

  changeVisibilityAfterSubmit() {
    document.body.classList.toggle('open')
    this.resService.isOpenAfterSubmit = !this.resService.isOpenAfterSubmit
    window.location.reload()
  }
}
