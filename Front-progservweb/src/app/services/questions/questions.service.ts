import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private API_URL = 'http://localhost:8001';

  constructor(private http: HttpClient) {}

  getPreguntasPorUsuario(userId: string): Observable<any>  {
    return this.http.get(`${this.API_URL}/MostrarPreguntas/${userId}`);
  }

  postPregunta(userId: number, content: string, subject: string, teacher: string ) {
    const pregunta = {content, subject, teacher};
    return this.http.post(`${this.API_URL}/CrearPreguntas/${userId}`, pregunta);
  }
  
  
}
