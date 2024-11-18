import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';
import { PostulantesService } from '../../../core/services/postulantes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filters } from '../../../core/models/filters.interface';

@Component({
  selector: 'app-ofertas-de-trabajo',
  templateUrl: './ofertas-de-trabajo.component.html',
  styleUrl: './ofertas-de-trabajo.component.css'
})
export class OfertasDeTrabajoComponent {

  data: any;

  isLoading = true;

  pageSize : number = 0;
  filtrosAplicados: Filters = {
    location: '',
    modality: '',
    status: '',
    title: ''
  };


  constructor(private postulantesService :PostulantesService) {
  }

  loadData(page: number, size: number, filters: Filters): void {
    this.isLoading = true;
    this.postulantesService.getAllOfertasLaboPage(
      page,
      size,
      filters.location,
      filters.modality,
      filters.status,
      filters.title
    ).subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err) => {
      },
      complete: () =>{
        this.isLoading = false;
      }
    });
  }


  imagenesBase64: string[] = [];
  imagenes: string[] = [
    'assets/imagenes/Tabla/tlogo.png',
    'assets/imagenes/Tabla/bbva.png',
    'assets/imagenes/Tabla/interbank.png'
  ];
  convertirImagenesABase64(): void {
    this.imagenes.forEach(imagenPath => {
      fetch(imagenPath)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imagenesBase64.push(reader.result as string);
          };
          reader.readAsDataURL(blob);
        });
    });
  }
  ngOnInit(): void {
    this.loadData(0,5, this.filtrosAplicados);
  }

  pageChanged(event: { page: number, size: number }){
    this.pageSize = event.size;
    this.loadData(event.page, this.pageSize, this.filtrosAplicados);
  }

  recieveFilters(filters: Filters) {
    if (JSON.stringify(this.filtrosAplicados) !== JSON.stringify(filters)) {
      this.filtrosAplicados = { ...filters };
      this.loadData(0, this.pageSize, this.filtrosAplicados);
    }
  }
}
