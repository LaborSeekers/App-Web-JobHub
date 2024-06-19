import { Component, Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  registerForm: FormGroup;
  showmodal: boolean = false;

  constructor(
    private router:Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder
    

  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', Validators.required],
      cel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      date: ['', Validators.required],
      type_user: ['postulant', Validators.required],
      check_terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeat_password')?.value
      ? null : { mismatch: true };
  }

  ngAfterViewInit(): void {
    const togglePassword = this.el.nativeElement.querySelector('#togglePassword');
    const password = this.el.nativeElement.querySelector('#password');

    const repeat_password = this.el.nativeElement.querySelector('#repeat_password');
    const repeat_togglePassword2 = this.el.nativeElement.querySelector('#repeat_togglePassword');

    this.renderer.listen(togglePassword, 'click', () => {
      if (password) {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        this.renderer.setAttribute(password, 'type', type);
        togglePassword.src = type === 'password' ? '../../assets/img/pass_e_icon.svg' : '../../assets/img/pass_e_icon.svg';
      }
    });

    this.renderer.listen(repeat_togglePassword2, 'click', () => {
      if (repeat_password) {
        const type = repeat_password.getAttribute('type') === 'password' ? 'text' : 'password';
        this.renderer.setAttribute(repeat_password, 'type', type);
        repeat_togglePassword2.src = type === 'password' ? '../../assets/img/pass_e_icon.svg' : '../../assets/img/pass_e_icon.svg';
      }
    });
  }

  onSubmit() {
    if (this.registerForm && this.registerForm.valid) {
      // Lógica de registro aquí
      console.log('Creación de cuenta correctamente', this.registerForm.value);
      this.showmodal = true;
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.registerForm?.markAllAsTouched();
    }
  }


  navigateToLogin(){
    this.router.navigate(['']);
  }
  
}
