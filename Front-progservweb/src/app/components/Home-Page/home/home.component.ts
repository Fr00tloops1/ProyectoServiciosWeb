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
        if (parsedData) {
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
    console.log("Contenido de nuevaPregunta:", this.nuevaPregunta);
  
    if (this.nuevaPregunta.trim()) {
      console.log("Hola2");
      if (typeof window !== 'undefined' && localStorage) {
        const userData = localStorage.getItem('userData');
       
        if (userData) {
          
          const parsedData = JSON.parse(userData);
          console.log(parsedData)
          if (parsedData) {
            
            this.questionService
              .postPregunta(parsedData, this.nuevaPregunta, 'Matemáticas', 'Profesor Charles Chaplin')
              .subscribe({
                next: (res) => {
                  console.log("Pregunta enviada con éxito:", res);
                  
                  this.nuevaPregunta = '';
                  this.cargarDatos();
                },
                error: (err) => {
                  console.error("Error al enviar la pregunta:", err);
                }
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



