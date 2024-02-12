import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, tap } from 'rxjs';
import { IQuestion } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  constructor(private http: HttpClient) { }

  /* createQuestions(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(`http://localhost:3000/questions`, question).pipe(
      delay(200),
      retry(2),
      tap()
    )
  } */
}