import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ofertante-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hidden=false;

  @Input() newMessage : boolean = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
