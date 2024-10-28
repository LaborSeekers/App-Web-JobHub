import { Component } from '@angular/core';

@Component({
  selector: 'app-header-entrevistas',
  templateUrl: './header-entrevistas.component.html',
  styleUrl: './header-entrevistas.component.css'
})
export class HeaderEntrevistasComponent {
  hidden=false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}

