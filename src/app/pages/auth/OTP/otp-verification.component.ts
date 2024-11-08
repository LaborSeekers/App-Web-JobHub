import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-otp-verification',
    templateUrl: './otp-verification.component.html',
    styleUrls: ['./otp-verification.component.css']  // Asegúrate de incluir esta línea
})

export class OtpVerificationComponent {
    otp: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    verificarOtp() {
        const email = localStorage.getItem('email'); // Recupera el correo de localStorage

        if (!email) {
            console.error('No se encontró el correo en localStorage.');
            alert('Hubo un problema. Por favor, intenta nuevamente.');
            return;
        }

        this.authService.verifyOtp(email, this.otp).subscribe({
            next: (response) => {
                console.log('OTP verificado exitosamente:', response);
                this.router.navigate(['/ruta-exito']);
                localStorage.removeItem('email'); // Elimina el correo de localStorage por seguridad
            },
            error: (error) => {
                console.error('Error al verificar OTP:', error);
                alert('Hubo un problema al verificar el OTP. Intenta nuevamente.');
            }
        });
    }
}



