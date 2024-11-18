import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from '../../../core/services/empresa.service';
import { Empresa } from '../../../core/models/user-info.interface';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrl: './register-emp.component.css'
})
export class RegisterEmpComponent {
  registerForm: FormGroup;
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresasService
    //private loginser: AuthService,
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required, Validators.maxLength(50)],
      description: ['', Validators.required, Validators.minLength(2)],
      logo: ['', [Validators.required]]      
    });
  }


  onSubmit(){
    if (this.registerForm.invalid){
      this.registerForm?.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;

    const newEmpresa = {
      name: formValue.name,
      description: formValue.description,
      logo: formValue.logo
    };

    this.empresaService.createEmpresa(newEmpresa).subscribe(()=>{
      this.showModal = true;
      this.registerForm.reset();
      this.base64Image = null;
      this.selectedFile = null;
    });
  }

  closeModal(){
    this.showModal = false;
  }

  selectedFile: File | null = null;
  base64Image: string | null = null;

  onFileSelected(event: Event): void {
    this.registerForm.get('logo')?.markAsTouched();
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.selectedFile = file;
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      this.resizeImage(base64);
    };
    reader.readAsDataURL(file);
  }

  resizeImage(base64Image: string): void {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 255;
        canvas.height = 255;
        ctx.drawImage(img, 0, 0, 255, 255);

        this.base64Image = canvas.toDataURL('image/jpeg');
        
        this.registerForm.patchValue({ logo: this.base64Image });
      }
    };
    img.src = base64Image;
  }
}
