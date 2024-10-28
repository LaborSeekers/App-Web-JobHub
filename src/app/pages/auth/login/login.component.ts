import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from '../../../core/models/user-request.interface';
import { UserResponse } from '../../../core/models/user-response.interface';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { UserInfo } from '../../../core/models/user-info.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private userService : UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    
    if (this.loginForm.valid) {      
      const userRequest: UserRequest = this.loginForm.value;
      this.authService.login(userRequest).subscribe({
        next: (response: UserResponse) => {
          
          
        },
        error: (error) => {
          this.errorMessage = error.error?.message;
        }
      });
    }
    else
    {
      this.loginForm.markAllAsTouched();
    }
  }


}
