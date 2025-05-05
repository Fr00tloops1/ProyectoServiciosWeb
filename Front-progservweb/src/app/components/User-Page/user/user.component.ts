import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(private router: Router) {}

  ModificarUsuario(){
    this.router.navigate(['/Modificar'])
  }

}
