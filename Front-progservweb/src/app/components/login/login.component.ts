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
          console.log(data.user)
          console.log(data.token)
          this.router.navigate(['/User'])
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user.id);
        },

        error: (error) =>{
          console.log("Errorsote", error);
        }
      })
    }
  }

}