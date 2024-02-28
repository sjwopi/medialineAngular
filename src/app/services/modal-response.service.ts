import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalResponseService {
  constructor() { }
  responseMessages: Record<string, Record<string, string>> = {
    200: {
      text: 'Успешно!',
      btn: 'Продолжить'
    },
    500: {
      text: 'Ошибка сервера!',
      btn: 'Попробовать еще раз'
    }
  }
  isOpenAfterSubmit: boolean = false;
  isLoad: boolean = false;
  isComplete: boolean = false;
  resText: string = '';
  resBtn: string = '';

  setStatus(status: number) {
    console.log(status)
    this.isComplete = false
    this.isLoad = false

    if (this.responseMessages[status]) {
      this.resText = this.responseMessages[status]["text"]
      this.resBtn = this.responseMessages[status]["btn"]
    } else {
      this.resText = "Что-то пошло не так!"
      this.resBtn = "Попробовать еще раз."
    }
    if (status == 200) {
      this.isComplete = true
    } else {
      this.isComplete = false
    }
  }
}
