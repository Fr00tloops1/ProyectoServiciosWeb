import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../../services/api.service';

interface User {
  id: number;
  NameUser: string;
  semester: number;
}

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user = {
    name: '',
    semester: ''
  };
  isLoading = true;
  error = '';

  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    console.log('Iniciando carga de datos del usuario');
    console.log('userId:', userId);
    console.log('token:', token);
    
    if (!userId || !token) {
      console.error('No hay sesión activa');
      this.router.navigate(['/']);
      return;
    }

    this.apiService.obtenerUsuario(Number(userId)).subscribe({
      next: (data) => {
        console.log('Respuesta completa del servidor:', data);
        // La respuesta tiene la estructura { mensaje: string, user: array }
        if (data && data.user && Array.isArray(data.user)) {
          const userData = data.user.find((user: User) => user.id === Number(userId));
          if (userData) {
            this.user = {
              name: userData.NameUser,
              semester: `${userData.semester}° semestre`
            };
            this.isLoading = false;
            console.log('Datos del usuario actualizados:', this.user);
          } else {
            console.error('Usuario no encontrado en la lista');
            this.error = 'No se encontró el usuario';
            this.isLoading = false;
          }
        } else {
          console.error('Estructura de datos inesperada:', data);
          this.error = 'No se pudieron obtener los datos del usuario';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error detallado:', error);
        if (error.status === 401) {
          this.error = 'Sesión expirada, por favor vuelve a iniciar sesión';
          this.cerrarSesion();
        } else {
          this.error = 'Error al cargar los datos del usuario';
        }
        this.isLoading = false;
      }
    });
  }

  // Método para regresar
  goBack() {
    this.location.back();
  }

  ModificarUsuario() {
    this.router.navigate(['/Modificar']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}