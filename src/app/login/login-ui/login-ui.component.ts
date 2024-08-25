import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from '../interfaces/user-request.interface';
import { UserResponse } from '../interfaces/user-response.interface';
import { LoginService } from '../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.css']
})
export class LoginUiComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService, private userService : UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    
    if (this.loginForm.valid) {
      
      const userRequest: UserRequest = this.loginForm.value;
      this.loginService.login(userRequest).subscribe({
        next: (response: UserResponse) => {
          this.userService.setUserId(response.id);
          console.log("id de usuario",this.userService.getUserId())
          if (response.type_user === 'postulant') {
            this.router.navigate(['/Postulantes']);
          } else if (response.type_user === 'ofertant') {

            this.router.navigate(['/Ofertantes']);
          }
        },
        error: (error) => {
          this.errorMessage = 'Invalid email or password';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
