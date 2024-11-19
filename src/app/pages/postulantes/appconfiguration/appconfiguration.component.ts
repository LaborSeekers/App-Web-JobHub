import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appconfiguration',
  templateUrl: './appconfiguration.component.html',
  styleUrl: './appconfiguration.component.css'
})
export class AppconfigurationComponent {
  constructor(private router: Router) {}

  redirectToChangePassword() {
    this.router.navigate(['/auth/forgot-password']);
  }
}
