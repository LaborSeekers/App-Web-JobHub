import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PostulantesService } from '../../../../core/services/postulantes.service';
import { AuthService } from '../../../../core/services/auth.service';
import { PostulanteCurriculum } from '../../../../core/models/postulante-curriculum.interface';
import { LanguageLevel } from '../../../../core/models/LanguageLevel.interface';
import { EducationLevel } from '../../../../core/models/EducationLevel.interface';
@Component({
  selector: 'app-editar-curriculum',
  templateUrl: './editar-curriculum.component.html',
  styleUrl: './editar-curriculum.component.css'
})
export class EditarCurriculumComponent {
  curriculumForm: FormGroup;
  niveles : LanguageLevel  [] = [];
  grados : EducationLevel  [] = [];
  curriculumExits = false;
  isLoading = true;
  idCurriculum : number = 0;
  constructor(private fb: FormBuilder,private postulantesService: PostulantesService, private AuthService: AuthService, private snackBar: MatSnackBar, ) {
    this.curriculumForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      telefono: [''],
      correo: [''],
      ubicacion: [''],
      acercaDe: [''],
      experienciaLaboral: this.fb.array([]),
      educacion: this.fb.array([]),
      habilidades: this.fb.array([]),
      idiomas: this.fb.array([])
    });
  }

  // Getters for FormArray controls
  get experienciaLaboral() {
    return this.curriculumForm.get('experienciaLaboral') as FormArray;
  }

  get educacion() {
    return this.curriculumForm.get('educacion') as FormArray;
  }

  get habilidades() {
    return this.curriculumForm.get('habilidades') as FormArray;
  }

  get idiomas() {
    return this.curriculumForm.get('idiomas') as FormArray;
  }

  agregarExperiencia() {
    const experienciaForm = this.fb.group({
      puesto: ['', Validators.required],
      empresa: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['']
    });
    this.experienciaLaboral.push(experienciaForm);
  }

  agregarEducacion() {
    const educacionForm = this.fb.group({
      institucion: ['', Validators.required],
      grado: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['']
    });
    this.educacion.push(educacionForm);
  }

  agregarHabilidad() {
    const habilidadControl = this.fb.control('');
    this.habilidades.push(habilidadControl);
  }

  agregarIdioma() {
    const idiomaForm = this.fb.group({
      idioma: ['', Validators.required],
      nivel: ['', Validators.required]
    });
    this.idiomas.push(idiomaForm);
  }

  // Remove entries
  eliminarExperiencia(index: number) {
    this.experienciaLaboral.removeAt(index);
  }

  eliminarEducacion(index: number) {
    this.educacion.removeAt(index);
  }

  eliminarHabilidad(index: number) {
    this.habilidades.removeAt(index);
  }

  eliminarIdioma(index: number) {
    this.idiomas.removeAt(index);
  }

  ngOnInit(): void {
    
    this.postulantesService.getCurriculum(this.AuthService.getUserInfo().userRoleId).subscribe({
      next: (response: PostulanteCurriculum) => {
        this.idCurriculum = response.id ?? 0;
        this.curriculumForm.patchValue({
          nombre: this.AuthService.getUserInfo().firstName,
          telefono: this.AuthService.getUserInfo().phone,
          apellido: this.AuthService.getUserInfo().lastName,
          acercaDe: response.content || ''
        });
    
        
        this.experienciaLaboral.clear();
        (response.workExperience || []).forEach((exp: any) => {
          this.experienciaLaboral.push(this.fb.group({
            puesto: exp.positionName || '',
            empresa: exp.companyName || '',
            descripcion: exp.description || '',
            fechaInicio: exp.startDate || '',
            fechaFin: exp.endDate || ''
          }));
        });
    
        
        this.educacion.clear();
        (response.education || []).forEach((edu: any) => {
          this.educacion.push(this.fb.group({
            institucion: edu.institutionName || '',
            grado: edu.eduLevel?.id || '',
            fechaInicio: edu.startDate || '',
            fechaFin: edu.endDate || ''
          }));
        });
    
        
        this.habilidades.clear();
        (response.skills || []).forEach((skill: any) => {
          this.habilidades.push(this.fb.control(skill.skillName || ''));
        });
    
        
        this.idiomas.clear();
        (response.languages || []).forEach((idioma: any) => {
          this.idiomas.push(this.fb.group({
            idioma: idioma.name || '',
            nivel: idioma.languageLevel?.id || ''
          }));
        });
        this.curriculumExits = true;
        this.isLoading=false
      },
      error: (error) => {
        this.curriculumExits = false;
        this.isLoading=false
      }
    });
    
    
      this.postulantesService.getLanguageLevels().subscribe({
        next: (response: LanguageLevel[]) => {
          this.niveles = response;
        },
        error: (error) => {
      }});

      this.postulantesService.getEducationLevels().subscribe({
        next: (response: EducationLevel[]) => {
          this.grados = response;
        },
        error: (error) => {
      }});


  }
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
  // Submit form data
  onSubmit(): void {
    if (this.curriculumForm.invalid) {
      this.curriculumForm.markAllAsTouched();
      const experienciaLaboralArray = this.curriculumForm.get('experienciaLaboral') as FormArray;
      experienciaLaboralArray.controls.forEach((control: AbstractControl) => {
        control.markAllAsTouched();
      });
      
      return;
    }
    
    const formValue = this.curriculumForm.value;
  
    const curriculumData = {
      postulante: {
        id: +this.AuthService.getUserInfo().userRoleId 
      },
      content: formValue.acercaDe, 
      
      // Mapeamos los idiomas al formato necesario
      languages: formValue.idiomas.map((idioma: any) => ({
        name: idioma.idioma,
        languageLevel: {
            id: +idioma.nivel,  
        }
    })),
    
      // Mapeamos la experiencia laboral
      work_experience: formValue.experienciaLaboral.map((exp: any) => ({
        positionName: exp.puesto,
        companyName: exp.empresa,
        description: exp.descripcion,
        startDate: exp.fechaInicio,
        endDate: exp.fechaFin,
      })),

      
  
      // Mapeamos la educación
      education: formValue.educacion.map((edu: any) => ({
        institutionName: edu.institucion,
        eduLevel: {
          id: +edu.grado,  // Supongamos que cada nivel educativo tiene un ID en el formulario
        },
        startDate: edu.fechaInicio,
        endDate: edu.fechaFin,
      })),

      skills: formValue.habilidades.map((habilidad: any) => ({
        skillName: habilidad,
      })),
    };
  
    if (this.curriculumExits) {
      this.postulantesService.updateCurriculum(this.idCurriculum,curriculumData).subscribe({
        next: () => {
          //console.log('Curriculum actualizado exitosamente');
          this.showSnackBar('Curriculum actualizado exitosamente');
        },
        error: (error) => {
          this.showSnackBar('Error al actualizar curriculum');
          //console.error('Error al actualizar curriculum', error);
        }
      });
    }
    else {
      this.postulantesService.createCurriculum(curriculumData).subscribe({
        next: () => {
          this.showSnackBar('Curriculum guardado exitosamente');
        },
        error: (error) => {
          this.showSnackBar('Error al guardar curriculum');
          //console.error('Error al guardar curriculum', error);
        }
      });
    }

  }
  

}
