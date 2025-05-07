import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { QuestionsService } from '../../services/questions/questions.service';

@Component({
  selector: 'app-questions',
  standalone: false,
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  constructor (private ApiService: QuestionsService){ }

  
  
}
