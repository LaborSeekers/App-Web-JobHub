import { UserRegistrationDTO } from '../../../core/models/user-registration-request.interface';
import { Component, Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { UserResponse } from '../../../core/models/user-response.interface';
import { Empresa, UserInfo } from '../../../core/models/user-info.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  registerForm: FormGroup;
  showmodal: boolean = false;
  empresas : Empresa  [] = [];
  userResponse: UserResponse | null = null;
  userRegistrationDTO: UserRegistrationDTO | null = null;
  userInfo: UserInfo | null = null;
  Rol : string | null = null;
  constructor(
    private router:Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,
    
    private loginser: AuthService,
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      birthday: ['', Validators.required],
      type_user: ['POSTULANTE', Validators.required],
      check_terms: [false, Validators.requiredTrue],
      empresaDropBox: ['',/*Validators.required*/] //posiblemente ocasione problemas (Agregar cuando descubra como hacer validador condicional)
      
    }, { validator: this.passwordMatchValidator });

  }
  selectedRol : string| null = null;
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeat_password')?.value
      ? null : { mismatch: true };
  }
  setSelecteRol(rol: string): void {
    this.selectedRol = rol;
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

  ngOnInit(): void {
    this.Rol = this.loginser.getRole()
    if ( this.Rol=== 'ADMIN') {
      this.LoadEmpresas();
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid){
      this.registerForm?.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;

    const newAccountPostulante = {
      firstName: formValue.name,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      birthday: formValue.birthday,
    };

    const newAccountOfertante = {
      firstName: formValue.name,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      birthday: formValue.birthday,
      empresa: { id: parseInt(formValue.empresaDropBox,10)}
    };

    
    if (formValue.type_user === 'POSTULANTE'){
      this.loginser.registerPostulante(newAccountPostulante).subscribe({
        next: (response: UserRegistrationDTO) => {       
          this.userRegistrationDTO = response;
          this.showmodal = true;
        },
        
        error: (error) =>{
          console.error('Error al crear cuenta', error);
        }
      });
    } 
    else if (formValue.type_user === 'OFERTANTE'){
      this.loginser.registerOfertante(newAccountOfertante).subscribe({
        next: (response: UserRegistrationDTO) => {       
          this.userRegistrationDTO = response;
          this.showmodal = true;
        },
        
        error: (error) =>{
          console.error('Error al crear cuenta', error);
        }
      });
    }
      
   
  }
 
  LoadEmpresas():void{
    this.loginser.getEmpresa().subscribe({
      next: (empresas: Empresa[]) => {
        this.empresas = empresas;
      },
      error: (error) => {
        console.error('Error al obtener las empresas', error);
      }
    })
  }
  navigateToLogin(){
    if(this.Rol === 'ADMIN'){
      this.router.navigate(['Postulantes']); //regresa al "inicio"
    }
    else{
      this.router.navigate(['']);
    }    
  }  
}
