import { EmpresasService } from './../../../core/services/empresa.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from '../../../core/models/user-info.interface';
import { AuthService } from '../../../core/services/auth.service';
import { UserRegistrationDTO } from '../../../core/models/user-registration-request.interface';
import { UserResponse } from '../../../core/models/user-response.interface';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  showmodal: boolean = false;
  empresas : Empresa  [] = [];
  selectedRol : string| null = null;
  Rol : string | null = null;
  userResponse: UserResponse | null = null;
  userRegistrationDTO: UserRegistrationDTO | null = null;
  filteredEmpresasList: any[] = this.empresas;

  searchTerm: string = '';
  isDropdownOpen: boolean = false;
  selectedEmpresa: any = null;
  placeholder: string = 'Seleccione una empresa';

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onFocus() {
    this.isDropdownOpen = true;
  }

  onBlur() {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
  }
  filterEmpresas(searchTerm: string) {
    this.filteredEmpresasList = this.empresas.filter(empresa =>
      empresa?.name.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    console.log(this.filteredEmpresasList)
  }

  selectEmpresa(empresa: any) {
    this.selectedEmpresa = empresa;
    this.registerForm.get('searchTerm')?.setValue(empresa.name);
    this.registerForm.get('empresaDropBox')?.setValue(empresa.id);

    console.log(this.registerForm.get('empresaDropBox'))
    this.isDropdownOpen = false;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeat_password')?.value
      ? null : { mismatch: true };
  }

  constructor(
    //private router:Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,    
    private loginser: AuthService,
    private empresaService: EmpresasService,
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
      empresaDropBox: ['',/*Validators.required*/], //posiblemente ocasione problemas (Agregar cuando descubra como hacer validador condicional)
      searchTerm: ['']
      
    }, { validator: this.passwordMatchValidator });
    this.registerForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.filterEmpresas(value);
    });

    this.LoadEmpresas();
  }

  setValidators() {
    if (this.selectedRol === 'OFERTANTE') {
      this.registerForm.get('empresaDropBox')?.setValidators([Validators.required]);
    } else {
      this.registerForm.get('empresaDropBox')?.clearValidators();
    }

    // Después de cambiar los validadores, es necesario llamar a updateValueAndValidity()
    this.registerForm.get('empresaDropBox')?.updateValueAndValidity();
  }

  setSelecteRol(rol: string): void {
    this.selectedRol = rol;
    this.setValidators();
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

  closeModal(){
    this.showmodal = false;
    this.registerForm.reset();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.log("Formulario inválido");
    
      // Marca todos los campos como tocados
      this.registerForm.markAllAsTouched();
    
      // Mostrar cuál es inválido
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          console.log(`${key} es inválido`);
        }
      });
    
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
        }
      });
    }   
  }

  LoadEmpresas():void{
    this.empresaService.getAllEmpresas().subscribe({
      next: (empresas: Empresa[]) => {
        console.log(empresas)
        this.empresas = empresas;
        this.filterEmpresas("");
      },
      error: (error) => {
      }
    })
  }

}
