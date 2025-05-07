import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private apiUrl = 'http://localhost:8001/MostrarMisPreguntas';

  constructor(private http: HttpClient) {}

  getUserQuestions() {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
