import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'Front-progservweb';

  usuarios: any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.apiService.getUsuarios().subscribe(
      
      data => {
        this.usuarios = data.user;
      },
      error => {
        console.error('Error cargando usuarios', error);
      }
    );
  }
}
