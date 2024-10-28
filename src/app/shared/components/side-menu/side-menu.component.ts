import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, Input } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private authService:AuthService, private router: Router) {}

  @Input() links: {
    route:Array<string>,
    image: string,
    alt: string,
    id: string,
    text: string
    }[]= [];
    
  selectedIndex: number | null = null;

  ngOnInit() {
    // Initialize selectedIndex based on the initial route
    this.updateSelectedIndex();

    // Subscribe to route changes to update selectedIndex
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateSelectedIndex());
  }

  updateSelectedIndex() {
    // Find the index of the link that matches the current route
    this.selectedIndex = this.links.findIndex(link => {
      const routeUrl = this.router.serializeUrl(this.router.createUrlTree(link.route));
      return this.router.url.includes(routeUrl);
    });
  }

  selectLink(index: number) {
    this.selectedIndex = index;
  }
  logout(){
    this.authService.logout();
  }
}
