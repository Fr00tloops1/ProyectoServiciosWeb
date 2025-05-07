import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'http://localhost:8001'; 

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.API_URL}/obtener`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, usuario);
  }

  actualizarUsuario(id: number, NameUser: string, semester: number, password: string): Observable<any> {
    const usuario = { NameUser, semester, password };
    return this.http.put(`${this.API_URL}/usuarios/${id}`,usuario);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/borrar/${id}`);
  }
  LogOut(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/LogOut/${id}`);
  }

  obtenerUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/obtener`, { headers });
  }

}
