import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';  // Asegúrate de tener este servicio para la recuperación
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('actions') actions!: ElementRef<HTMLDivElement>;
  @ViewChild('description') description!: ElementRef<HTMLParagraphElement>;
  @ViewChild('confirmationMessage') confirmationMessage!: ElementRef<HTMLParagraphElement>;
  @ViewChild('changePassword') changePassword!: ElementRef<HTMLDivElement>; 

  email: string = '';  // Variable para almacenar el correo electrónico

    constructor(private router: Router, private authService: AuthService) {}

    // Método que se llama cuando el usuario hace clic en 'Recuperar cuenta'
    recoverAccount() {
        const emailValue = this.emailInput.nativeElement.value;  // Obtén el valor del input de correo

        if (emailValue) {
            this.email = emailValue;  // Asigna el correo ingresado a la variable 'email'
            localStorage.setItem('email', emailValue);

            // Llamada a tu servicio para enviar el correo de recuperación
            this.authService.forgotPassword(emailValue).subscribe({
                next: () => {
                    // Muestra los mensajes de confirmación
                    this.actions.nativeElement.style.display = 'none';
                    this.description.nativeElement.style.display = 'none';
                    this.confirmationMessage.nativeElement.style.display = 'block';
                    this.changePassword.nativeElement.style.display = 'block';

                    // Redirige a la página OTP
                    this.router.navigate(['/auth/forgot-password/otp']);
                },
                error: () => {
                    alert('Error al enviar el correo de recuperación. Por favor, inténtelo de nuevo.');
                }
            });
        } else {
            alert('Por favor, ingrese su correo electrónico.');
        }
    }
}


