import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.css'
})
export class LoginUiComponent {
  loginForm: FormGroup;
  constructor(private router:Router, private fb: FormBuilder)
  {
    this.loginForm = this.fb.group({});

  }
  navigateToPostulante(){
    this.router.navigate(['Postulantes']);
  }
  onSubmit() {
    if (this.loginForm && this.loginForm.valid) {
      this.router.navigate(['Postulantes']);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.loginForm?.markAllAsTouched();
    }
  }
}
