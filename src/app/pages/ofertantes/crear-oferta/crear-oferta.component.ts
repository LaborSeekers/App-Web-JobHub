import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfertantesService } from '../../../core/services/ofertantes.service';
import { OfertaLaboralRequest } from '../../../core/models/ofertaLaboral-request-interface';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrl: './crear-oferta.component.css'
})
export class CrearOfertaComponent implements OnInit {
  ofertaForm!: FormGroup;
  isEditMode: boolean = false;
  offerId?: number;

  constructor(
    private fb: FormBuilder,
    private ofertantesService: OfertantesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authService :AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.offerId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.offerId) {
      this.isEditMode = true;
      this.loadOfferForEdit();
    }
  }

  private initForm(): void {
    this.ofertaForm = this.fb.group({
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      benefits: ['', Validators.required],
      title: ['', Validators.required],
      jobModality_id: ['', Validators.required],
      salary: ['', Validators.required],
      location: ['', Validators.required],
      scheduledDate: [''],   // Campo para la fecha
      scheduledTime: [''],   // Campo para la hora
      scheduledPublishAt: [''],
      logo: [''],
      image: [''],
      video: [''],
      status: [''],
      ofertante_id: ['']
    });
  }


  private loadOfferForEdit(): void {
    //COMO
    this.ofertantesService.getJobOfferById(this.offerId!).subscribe({

      next: (offer: ofertalLaboral) => {
        const userInfo = this.authService.getUserInfo();
        const userId = userInfo?.firstName+" "+ userInfo?.lastName;

              // Comprobar si el ofertante_id de la oferta no coincide con el userRoleId del usuario actual
      if (offer.ofertanteName !== userId) {
        this.router.navigate(['Ofertantes/hub/inicio']);
        this.showSnackBar('No tienes permisos para editar esta oferta');
        return; // Salir de la función si no tienes permisos
      }

        let scheduledDate = null;
        let scheduledTime = null;
        if (offer.scheduledPublishAt) {
          const date = new Date(offer.scheduledPublishAt);
          scheduledDate = this.formatDate(date);
          scheduledTime = this.formatTime(date);
        }


        this.ofertaForm.patchValue({
          ...offer,
          scheduledDate: scheduledDate,
          scheduledTime: scheduledTime,
          jobModalityName: offer.jobModalityName // Use jobModalityName directly
        });
      },
      error: (error) => {
        this.showSnackBar('Error al cargar la oferta laboral');
      }
    });
  }

  onSubmit(): void {
    if (this.ofertaForm.invalid) {
      this.ofertaForm.markAllAsTouched();
      return;
    }

    const userInfo = this.authService.getUserInfo();
    const userId = userInfo?.userRoleId;

    const scheduledDate = this.ofertaForm.get('scheduledDate')?.value;
    const scheduledTime = this.ofertaForm.get('scheduledTime')?.value;

    if (scheduledDate && scheduledTime) {
      const date = new Date(scheduledDate);
      const [hours, minutes] = scheduledTime.split(':').map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      const formattedDateTime = this.formatDateTime(date);
      this.ofertaForm.patchValue({
        scheduledPublishAt: formattedDateTime,
        ofertante_id: userId
      });
    } else {
      this.ofertaForm.patchValue({
        scheduledPublishAt: null,
        ofertante_id: userId
      });
    }

    const ofertaData: OfertaLaboralRequest = this.ofertaForm.value;
    if (!ofertaData.status) {
      delete ofertaData.status;
    }

    let request: Observable<ofertalLaboral>;
    if (this.isEditMode) {
      request = this.ofertantesService.updateJobOffer(this.offerId!, ofertaData);
    } else {
      request = this.ofertantesService.createJobOffer(ofertaData);
    }

    request.subscribe({
      next: () => {
        this.showSnackBar(this.isEditMode ? 'Oferta laboral actualizada con éxito' : 'Oferta laboral creada con éxito');
        this.router.navigate(['Ofertantes/hub/inicio']);
      },
      error: (error) => {
        this.showSnackBar(this.isEditMode ? 'Error al actualizar la oferta laboral' : 'Error al crear la oferta laboral');
      }
    });
  }
  // Función para formatear la fecha como 'YYYY-MM-DD HH:mm:ss'
  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }


  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatTime(date: Date): string {
    return date.toTimeString().split(' ')[0].slice(0, 5);
  }

  vistaPrevia(): void {
  }

  salir(): void {
    this.router.navigate(['Ofertantes/hub/inicio']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.ofertaForm.patchValue({
          logo: base64String // Guardar la imagen en base64 en el formulario
        });
      };
      reader.readAsDataURL(file);
    }
  }
}