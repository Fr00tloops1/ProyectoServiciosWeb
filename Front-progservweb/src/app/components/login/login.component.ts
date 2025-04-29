import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  NameField: string = ""
  SemesterField!: number  
  PasswordField: string = ""
  

  SendData(form: NgForm){
    if(form.valid){
      console.log("Ou yeah")
    }
  }

}
