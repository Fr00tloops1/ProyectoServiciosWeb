import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  constructor(private http: HttpClient) { }

  private API_URL = 'http://localhost:8001'; 

  LogIn(NameUser: string, semester: number, password: string): Observable<any> {
    const body = { NameUser, semester, password };
    return this.http.post(`${this.API_URL}/LogIn`, body);
  }

}
