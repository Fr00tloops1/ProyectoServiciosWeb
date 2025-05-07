import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/questions/questions.service';
import { CommonModule } from '@angular/common';     // <--- Importar esto
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,  // Necesario para *ngFor, *ngIf, etc.
    FormsModule    // Necesario para [(ngModel)]
  ]
})
export class HomeComponent implements OnInit {

  preguntas: any[] = [];
  respuestas: { contenido: string; autor: string; preguntaId: number; }[] = [];
  comentarios: { contenido: string; autor: string; preguntaId: number; }[] = [];

  nuevaPregunta = '';

  constructor(
    private questionService: QuestionsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    if (typeof window !== 'undefined' && localStorage) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.id) {
          this.questionService.getPreguntasPorUsuario(parsedData.id.toString()).subscribe(data => {
            this.preguntas = data.preguntas;
            this.respuestas = data.respuestas;
            this.comentarios = data.comentarios;
          });
        }
      }
    }
  }

  agregarPregunta() {
    if (this.nuevaPregunta.trim()) {
      if (typeof window !== 'undefined' && localStorage) {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          if (parsedData.id) {
            this.questionService.postPregunta({ 
              userId: parsedData.id.toString(), 
              titulo: this.nuevaPregunta 
            }).subscribe(() => {
              this.nuevaPregunta = '';
              this.cargarDatos();
            });
          }
        }
      }
    }
  }

  irAPerfil() {
    this.router.navigate(['/User']);
  }
}



