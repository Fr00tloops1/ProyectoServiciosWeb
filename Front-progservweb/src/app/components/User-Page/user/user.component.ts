import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiUsuariosService } from '../../../services/user/api.usuarios.service';

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
  userId!: number;

  constructor(
    private router: Router,
    private location: Location,
    private apiServices: ApiUsuariosService
  ) {}

  ngOnInit() {
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        console.log('Datos del usuario:', parsedData);
        
        // Validar que tengamos al menos el nombre y el semestre
        if (parsedData.NameUser && parsedData.semester !== undefined) {
          this.user = {
            name: parsedData.NameUser,
            semester: `${parsedData.semester}° semestre`
          };
          this.userId = parsedData.id;
        } else {
          console.error('Datos de usuario incompletos:', parsedData);
          this.router.navigate(['/']);
        }
      } else {
        console.error('No se encontraron datos de usuario');
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error al procesar datos del usuario:', error);
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.location.back();
  }

  ModificarUsuario() {
    this.router.navigate(['/Modificar']);
  }

  cerrarSesion() {
    this.apiServices.LogOut(this.userId).subscribe({
      next: (data) => {
        console.log('Logout exitoso:', data);
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error en logout:', error);
        // Aún así, limpiamos el localStorage y redirigimos
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    });
  }
}