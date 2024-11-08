import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs'; // Importar forkJoin para llamadas paralelas

import { ModalFiltroComponent } from './modal-filtro/modal-filtro.component';
import { AuthService } from '../../../core/services/auth.service';
import { OfertantesService } from '../../../core/services/ofertantes.service';
import { ApplicationsService } from '../../../core/services/applications.service';
import { UserInfo } from '../../../core/models/user-info.interface'; // Importa UserInfo
import { PostulantesService } from '../../../core/services/postulantes.service';
import { Postulante } from '../../../core/models/postulante-dto-response';
@Component({
  selector: 'app-ver-postulantes',
  templateUrl: './ver-postulantes.component.html',
  styleUrls: ['./ver-postulantes.component.css']
})
export class VerPostulantesComponent implements OnInit {
  postulante: Postulante | null = null;  // Variable para almacenar el postulante

  professionFilter: string = '';
  studyCenterFilter: string = '';
  filteredCandidates: Postulante[] = [];  // Lista de postulantes filtrados

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
    private ofertantesService: OfertantesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private applicationsService: ApplicationsService,
    private postulantesService: PostulantesService // Asegúrate de tener PostulantesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const offerIdParam = params.get('offerId');
      if (offerIdParam) {
        const offerId = +offerIdParam;
        this.loadCandidates(offerId);          
      }
    });
  }

  // Método para cargar los postulantes
  private loadCandidates(offerId: number): void {
    this.applicationsService.loadApplicationsByJobId(offerId).subscribe({
      next: (applications) => {
        const candidateApplicationMap = new Map<number, number>();
        applications.forEach(application => candidateApplicationMap.set(application.postulante_id, application.id));

        const candidateIds = Array.from(candidateApplicationMap.keys());

        this.postulantesService.getPostulantesByIds(candidateIds).subscribe({
          next: (candidates: Postulante[]) => {
            // Añadir applicationId a cada candidato
            this.filteredCandidates = candidates.map(candidate => ({
              ...candidate,
              applicationId: candidateApplicationMap.get(candidate.id) // Asignar applicationId al candidato
            }));

            console.log(this.filteredCandidates)
            this.applyFilters();  // Aplicar los filtros si es necesario
          },
          error: (error) => {
            console.error('Error al cargar los postulantes:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar las aplicaciones:', error);
      }
    });
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(ModalFiltroComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.professionFilter = result.profession;
        this.studyCenterFilter = result.studyCenter;
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {

  }

  gotoBack(): void {
    window.history.back();
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
