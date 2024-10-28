import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Offer {
  position: number;
  name: string;
}

const OFFERS: Offer[] = [
  { position: 1, name: 'OFERTA LABORAL 01 - GESTIÓN DE CLIENTES' },
  { position: 2, name: 'OFERTA LABORAL 02 - GESTOR DE ENTREGAS ' },
  { position: 3, name: 'OFERTA LABORAL 03 - PERSONAL PARA ANGULAR' },
];


@Component({
  selector: 'app-ofertas-publicadas',
  templateUrl: './ofertas-publicadas.component.html',
  styleUrl: './ofertas-publicadas.component.css'
  
})
export class OfertasPublicadasComponent {
  displayedColumns: string[] = ['offer'];
  dataSource = new MatTableDataSource(OFFERS);



  constructor(private router: Router){}

  goToCandidatos(offerId: number){
    this.router.navigate(['/ver-postulantes', offerId]);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}