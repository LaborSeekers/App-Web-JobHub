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
            alert('Hubo un problema. Por favor, intenta nuevamente.');
            return;
        }

        this.authService.verifyOtp(email, this.otp).subscribe({
            next: (response) => {
                this.router.navigate(['/auth/change-password']);
            },
            error: (error) => {
                alert('Hubo un problema al verificar el OTP. Intenta nuevamente.');
            }
        });
    }
}



