import { Component, ElementRef, ViewChild } from '@angular/core';

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

  recoverAccount() {
    const emailValue = this.emailInput.nativeElement.value;
    if (emailValue) {
      this.actions.nativeElement.style.display = 'none';
      this.description.nativeElement.style.display = 'none';
      this.confirmationMessage.nativeElement.style.display = 'block';
      this.changePassword.nativeElement.style.display = 'block';
    } else {
      alert("Por favor, ingrese su correo electrónico.");
    }
  }
}