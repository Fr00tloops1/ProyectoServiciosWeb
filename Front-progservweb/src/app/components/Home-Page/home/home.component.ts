
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/questions/questions.service';
import { CommonModule } from '@angular/common';     // <--- Importar esto
import { FormsModule } from '@angular/forms';  

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

  constructor(private questionService: QuestionsService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.questionService.getPreguntasPorUsuario(userId).subscribe(data => {
        this.preguntas = data.preguntas;
        this.respuestas = data.respuestas;
        this.comentarios = data.comentarios;
      });
    }
  }

  agregarPregunta() {
    if (this.nuevaPregunta.trim()) {
      const userId = localStorage.getItem('userId');
if (!userId) {
  console.error('No hay userId en localStorage');
  return;
}
      this.questionService.postPregunta({ userId, titulo: this.nuevaPregunta }).subscribe(() => {
        this.nuevaPregunta = '';
        this.cargarDatos(); // Actualiza la lista
      });
    }
  }
}



