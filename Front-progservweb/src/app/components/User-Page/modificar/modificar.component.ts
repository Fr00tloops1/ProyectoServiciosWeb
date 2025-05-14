import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-modificar',
  standalone: false,
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.css'
})
export class ModificarComponent  implements OnInit{

 ngOnInit(): void {
  const id = localStorage.getItem('userId');
  if (id) {
    this.userId = Number(id); // o parseInt(id) si es necesario
  }
 }

  constructor(private router: Router, private apiServices: ApiService){ }

  NameField: string = ""
  SemesterField!: number  
  PasswordField: string = ""
  userId!: number; 


  SendUpdate(form: NgForm){
    if(form.valid){
      this.apiServices.actualizarUsuario(this.userId, this.NameField,this.SemesterField,this.PasswordField).subscribe({
        next: (data) => {
          console.log(data.user)
          this.router.navigate(['/Login'])
        },

        error: (error) =>{
          console.log("Errorsote", error);
        }
      })
    }
  }
}
