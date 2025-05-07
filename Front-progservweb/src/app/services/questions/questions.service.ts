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

  postPregunta(pregunta: { userId: string, titulo: string }) {
    return this.http.post(`${this.API_URL}/CrearPreguntas`, pregunta);
  }
  
}
