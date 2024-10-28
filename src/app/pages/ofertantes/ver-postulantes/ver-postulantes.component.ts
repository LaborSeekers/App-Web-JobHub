import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ModalFiltroComponent } from './modal-filtro/modal-filtro.component';


interface Offer {
  position: number;
  name: string;
}

interface Candidate{
  image:string;
  name:string;
  profession: string;
  studyCenter:string;
  skills: string[];
}

const OFFERS: Offer[] = [
  { position: 1, name: 'OFERTA LABORAL 01 - GESTIÓN DE CLIENTES' },
  { position: 2, name: 'OFERTA LABORAL 02 - GESTOR DE ENTREGAS' },
  { position: 3, name: 'OFERTA LABORAL 03 - PERSONAL PARA ANGULAR' },
];

@Component({
  selector: 'app-ver-postulantes',
  templateUrl: './ver-postulantes.component.html',
  styleUrl: './ver-postulantes.component.css'
})
export class VerPostulantesComponent implements OnInit {

  professionFilter: string = '';
  studyCenterFilter: string = '';

  offer: Offer | undefined;
  filteredCandidates: Candidate[] = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}


  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const offerIdParam = params.get('offerId');
      if (offerIdParam) {
        const offerId = +offerIdParam;
        this.offer = OFFERS.find(offer => offer.position === offerId);
        this.filteredCandidates = this.candidatos;
      }
    });
  }


  openFilterDialog():void{
    const dialogRef = this.dialog.open(ModalFiltroComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.professionFilter = result.profession;
        this.studyCenterFilter = result.studyCenter;
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    this.filteredCandidates = this.candidatos.filter(candidate =>
      (!this.professionFilter || candidate.profession.includes(this.professionFilter)) &&
      (!this.studyCenterFilter || candidate.studyCenter.includes(this.studyCenterFilter))
    );
  }


  gotoBack(): void {
    window.history.back();
  }

  candidatos = [
    {
      image: '../../assets/imagenes/Card/FotoPerfil.png',
      name: 'Jhadir Riveros',
      profession: 'Ingeniería de Software',
      studyCenter: 'UPC',
      skills: ['Habilidad 1','Habilidad 2','Habilidad 3']
    },
    {
      image: '../../assets/imagenes/Card/FotoPerfil2.png',
      name: 'Jhadir Riveros',
      profession: 'Ciencias de la Computación',
      studyCenter: 'UPC',
      skills: ['Habilidad 1','Habilidad 2','Habilidad 3']
    },
    {
      image: '../../assets/imagenes/Card/FotoPerfil.png',
      name: 'Jhadir Riveros',
      profession: 'Ingeniería de Sistemas',
      studyCenter: 'PUCP',
      skills: ['Habilidad 1','Habilidad 2','Habilidad 3']
    }
    
  ];


}
