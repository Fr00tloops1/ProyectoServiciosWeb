import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { QuestionsService } from '../../../services/questions/questions.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private questionService: QuestionsService){ }

  contentField: string = ""
  subjectField: string = ""
  teacherField: string = ""

  sendQuestion(form: NgForm){
    if (form.valid){
      this.questionService.crearPregunta(this.contentField,this.subjectField,this.teacherField).subscribe({

      })
    }
  }

}
