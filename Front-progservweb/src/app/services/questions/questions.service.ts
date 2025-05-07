import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }
    
  private API_URL = 'http://localhost:8001'; 
  
  getPreguntas(): Observable<any> {
    return this.http.get(`${this.API_URL}/MostrarPreguntas`);
  }

  crearPregunta(content: string, subject: string, teacher: string): Observable<any> {
    const question = {content, subject, teacher}
    return this.http.post(`${this.API_URL}/CrearPreguntas`, question);
  }

  actualizarPregunta(id: number, content: string, subject: string, teacher: string): Observable<any> {
    const question = {content, subject, teacher};
    return this.http.put(`${this.API_URL}/EditarPregunta/${id}`,question);
  }

  eliminarPregunta(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/EliminarPregunta/${id}`);
  }
}
