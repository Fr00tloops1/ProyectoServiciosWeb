import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUsuariosService } from '../../services/user/api.usuarios.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  constructor(private router: Router, private apiServices: ApiUsuariosService){ }


  NameField: string = ""
  SemesterField!: number  
  PasswordField: string = ""

  SendData(form: NgForm){
    if(form.valid){
      this.apiServices.LogIn(this.NameField,this.SemesterField,this.PasswordField).subscribe({
        next: (data) => {
          console.log('Respuesta del login:', data);
          if (data && data.user && data.user.id) {
            const tokenString = typeof data.token === 'object' ? JSON.stringify(data.token) : data.token;
            localStorage.setItem('token', tokenString);
            localStorage.setItem('userId', data.user.id);
            console.log('ID del usuario guardado:', data.user.id);
            console.log('Token guardado:', tokenString);
            this.router.navigate(['/User']);
          } else {
            console.error('La respuesta del servidor no tiene la estructura esperada:', data);
          }
        },
        error: (error) =>{
          console.error("Error en el login:", error);
        }
      })
    }
  }

}
