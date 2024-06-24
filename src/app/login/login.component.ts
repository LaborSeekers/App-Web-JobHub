import { Component, AfterViewInit, ElementRef, Renderer2, inject } from '@angular/core';
import { LoginService } from './services/login.service';
import { UserResponse } from './interfaces/user-response.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  

  dataSource = new MatTableDataSource<UserResponse>();

  constructor(private loginService: LoginService, private el: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    const linkedinLogin = this.el.nativeElement.querySelector('#linkedinLogin');
    const githubLogin = this.el.nativeElement.querySelector('#githubLogin');
    const googleLogin = this.el.nativeElement.querySelector('#googleLogin');
    const togglePassword = this.el.nativeElement.querySelector('#togglePassword');
    const password = this.el.nativeElement.querySelector('#password');

    this.renderer.listen(linkedinLogin, 'click', () => {
      window.location.href = 'https://www.linkedin.com/login';
    });

    this.renderer.listen(githubLogin, 'click', () => {
      window.location.href = 'https://github.com/login';
    });

    this.renderer.listen(googleLogin, 'click', () => {
      window.location.href = 'https://accounts.google.com/signin/v2/identifier';
    });

    this.renderer.listen(togglePassword, 'click', () => {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      this.renderer.setAttribute(password, 'type', type);
      this.renderer.setAttribute(togglePassword, 'src', type === 'password' ? 'assets/imagenes/Eye.png' : 'assets/imagenes/Eye.png');
    });
  }

  loadUsers(): void {
    this.loginService.getUser().subscribe(users => {
      this.dataSource.data = users;
    });
  }
}
