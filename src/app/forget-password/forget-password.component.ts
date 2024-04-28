import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email!: string;

  constructor(private authService: AuthService) { }

  forgotPassword(): void {
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        // Traitez ici la réponse en cas de succès
        console.log(response);
      },
      error => {
        // Traitez ici l'erreur
        console.error(error);
      }
    );
  }
}
