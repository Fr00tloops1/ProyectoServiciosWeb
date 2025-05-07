import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUsuariosService } from '../../../services/user/api.usuarios.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  constructor(private router: Router, private apiServices: ApiUsuariosService ) {}

  userId!: number; 

  
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('userId');
      if (id) {
        this.userId = Number(id);
      }
    }
  }

  ModificarUsuario(){
    this.router.navigate(['/Modificar'])
  }
  CerrarSesion(){

    this.apiServices.LogOut(this.userId).subscribe({
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
