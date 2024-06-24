import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';

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

  constructor(private renderer: Renderer2) {}

  togglePasswordVisibility(inputElement: HTMLInputElement, eyeIconElement: HTMLImageElement): void {
    const inputType = inputElement.getAttribute('type');
    const newType = inputType === 'password' ? 'text' : 'password';
    const eyeIconSrc = newType === 'password' ? 'assets/imagenes/Eye.png' : 'assets/imagenes/Eye.png';

    this.renderer.setAttribute(inputElement, 'type', newType);
    this.renderer.setAttribute(eyeIconElement, 'src', eyeIconSrc);
  }

  onSubmit(): void {
    const newPassword = this.newPasswordInput.nativeElement.value;
    const confirmPassword = this.confirmPasswordInput.nativeElement.value;

    if (newPassword !== confirmPassword) {
      // Handle password mismatch error
      console.log('Las contraseñas no coinciden');
    } else {
      // Proceed with password change
      console.log('Contraseñas coinciden. Procesar cambio de contraseña.');
    }
  }
}
