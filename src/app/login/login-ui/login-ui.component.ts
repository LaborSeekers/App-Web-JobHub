import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from '../interfaces/user-request.interface';
import { UserResponse } from '../interfaces/user-response.interface';
import { LoginService } from '../services/login.service';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../interfaces/userInfo';

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
          
          this.loginService.getUserbyEmail(userRequest.email).subscribe({
            next: (userProfileDTO: UserInfo) => {
            this.userService.setUserId(userProfileDTO.id);
            console.log("id de usuario",this.userService.getUserId())
          },
          error : (error) => {
          this.errorMessage = error.error.message;
          }});
          
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      });
    }
    else
    {
      this.loginForm.markAllAsTouched();
    }
  }


}
