import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, retry, tap } from 'rxjs';
import { IFeedback } from '../models/feedback.model';
import { BASE_URL } from 'global';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {
  constructor(private http: HttpClient) { }
  baseUrl: string = BASE_URL;

  createFeedback(feedback: IFeedback): Observable<IFeedback> {
    let formData = new FormData();
    Object.keys(feedback).forEach((key: string) => {
      formData.append(
        key,
        /* @ts-ignore */
        feedback[key]
      );
    })

    return this.http.post<IFeedback>(`${this.baseUrl}/feedback`, formData).pipe(
      delay(200),
      retry(2),
      tap()
    )
  }
}