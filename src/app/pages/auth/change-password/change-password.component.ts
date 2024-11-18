import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  @ViewChild('newPasswordInput') newPasswordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('newEyeIcon') newEyeIcon!: ElementRef<HTMLImageElement>;
  @ViewChild('confirmEyeIcon') confirmEyeIcon!: ElementRef<HTMLImageElement>;

  constructor(private router: Router, private authService: AuthService, private renderer: Renderer2) {}

  togglePasswordVisibility(inputElement: HTMLInputElement, eyeIconElement: HTMLImageElement): void {
    const inputType = inputElement.getAttribute('type');
    const newType = inputType === 'password' ? 'text' : 'password';
    const eyeIconSrc = newType === 'password' ? 'assets/imagenes/Eye.png' : 'assets/imagenes/Eye.png';

    this.renderer.setAttribute(inputElement, 'type', newType);
    this.renderer.setAttribute(eyeIconElement, 'src', eyeIconSrc);
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
  
    const newPassword = this.newPasswordInput.nativeElement.value;
    const confirmPassword = this.confirmPasswordInput.nativeElement.value;
    const email = localStorage.getItem('email'); // Recupera el correo de localStorage
  
    if (!email) {
      console.error('No se encontró el correo en localStorage.');
      alert('Hubo un problema. Por favor, intenta nuevamente.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      console.log('Las contraseñas no coinciden');
      alert('Las contraseñas no coinciden. Intente nuevamente.');
      return;
    }
  
    // Llamada al servicio para actualizar la contraseña
    this.authService.setPassword(email, newPassword).subscribe({
      next: (response) => {
        console.log('Contraseña actualizada con éxito', response);
        alert('Contraseña actualizada. Ahora puede iniciar sesión con la nueva contraseña.');
        this.router.navigate(['/auth/login']); // Redirige al login
      },
      error: (error) => {
        console.error('Error al actualizar la contraseña', error);
        alert('Hubo un problema al actualizar la contraseña. Intenta nuevamente.');
      }
    });
  }
  
}
