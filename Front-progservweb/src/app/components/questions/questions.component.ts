import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/questions/questions.service';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html'
})
export class UserQuestionsComponent implements OnInit {
  questions: any[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getUserQuestions().subscribe(
      (res: any) => {
        this.questions = res;
      },
      err => {
        console.error('Error al cargar preguntas', err);
      }
    );
  }
}
