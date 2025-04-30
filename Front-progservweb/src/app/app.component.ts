import { Component, OnInit } from '@angular/core';
import { ApiUsuariosService } from './services/user/api.usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent{
  
  title = 'Front-progservweb';

  usuarios: any[] = [];
  constructor(private apiService: ApiUsuariosService) { }

  
}
