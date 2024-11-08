import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
    text: string,
    badge?: number;
    }[]= [];
    
  selectedIndex: number | null = null;

  ngOnInit() {
    this.updateSelectedIndex();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateSelectedIndex());
  }

  updateSelectedIndex() {
    this.selectedIndex = this.links.findIndex(link => {
      const routeUrl = this.router.serializeUrl(this.router.createUrlTree(link.route));
      return this.router.url.includes(routeUrl);
    });
  }

  selectLink(index: number) {
    this.selectedIndex = index;

    this.checkNavbar();
  }
  logout(){
    this.authService.logout();
  }

  dropdownVisible = false;
  isDropdownVisible = false;

  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChild('navLinks') navLinks!: ElementRef;

  ngAfterViewInit() {
    this.checkNavbar();
    window.addEventListener('resize', this.checkNavbar.bind(this));
  }

  checkNavbar() {
    const navbarWidth = this.navbar.nativeElement.offsetWidth;
    const windowWidth = window.innerWidth; // Ancho de la ventana
    const threshold = windowWidth * 0.6; // 90% del ancho de la ventana

    // Verifica si el ancho del navbar es mayor al 90% de la ventana
    setTimeout(() => {
      this.isDropdownVisible = navbarWidth > threshold;
      if (!this.isDropdownVisible) {
          this.dropdownVisible = false;
      }
  });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible; // Alterna la visibilidad del menú
  }
}
