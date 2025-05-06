import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }
    
  private API_URL = 'http://localhost:8001'; 

/*
  crearPregunta(): Observable<any> {
    return.this.http.post

  }
    */
}
