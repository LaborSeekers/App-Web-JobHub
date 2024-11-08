import { Component } from '@angular/core';

@Component({
  selector: 'app-postulante-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hidden=false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}