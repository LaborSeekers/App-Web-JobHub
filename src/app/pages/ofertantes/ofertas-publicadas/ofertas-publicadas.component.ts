import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfertantesService } from '../../../core/services/ofertantes.service';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-ofertas-publicadas',
  templateUrl: './ofertas-publicadas.component.html',
  styleUrls: ['./ofertas-publicadas.component.css']
})

export class OfertasPublicadasComponent implements OnInit {
  jobOffers: ofertalLaboral[] = [];
  totalElements = 0;
  pageSize = 3;
  pageIndex = 0;
  filterTitle = '';
  filterModality = '';
  filterStatus = '';
  userId: number | null = null; // Agregar userId


  constructor(
    private ofertantesService: OfertantesService,
    private router: Router,
    private authService: AuthService, // Inyectar AuthService
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inyecta MatDialog

  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserInfo()?.userRoleId || null; // Obtener el userId
    this.loadJobOffers();
  }
  loadJobOffers(): void {
    if (this.userId !== null) { // Asegúrate de que userId no sea null
      this.ofertantesService.getJobOffersByOffertanteId(
        this.userId, // Pasar el userId (ofertanteId)
        '',  // location, si decides incluir un campo para la ubicación
        this.filterModality ? parseInt(this.filterModality) : undefined, // Convertir a número
        this.filterStatus,
        this.filterTitle,
        this.pageIndex,
        this.pageSize
      ).subscribe({
        next: (response) => {
          if (response && response.content) {
            this.jobOffers = response.content;
            // Asignar totalElements desde la respuesta
            this.totalElements = response.page.totalElements; // Asegúrate de que esta sea la estructura correcta
          } else {
            this.jobOffers = [];
            this.totalElements = 0;
          }
        },
        error: (error) => {
          this.showSnackBar('Error al cargar las ofertas laborales');
          this.jobOffers = [];
          this.totalElements = 0;
        }
      });
    } else {
      this.showSnackBar('Error al cargar las ofertas laborales: ID de usuario no disponible');
      this.jobOffers = [];
      this.totalElements = 0;
    }
  }

  applyFilter(): void {
    this.pageIndex = 0; // Resetear a la primera página al aplicar filtros
    this.loadJobOffers();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex; // Actualizar el índice de página
    this.pageSize = event.pageSize; // Actualizar el tamaño de página
    this.loadJobOffers(); // Cargar ofertas laborales con la nueva paginación
  }

  viewDetails(offer: ofertalLaboral): void { // Cambia el parámetro a 'offer'
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: 'auto',
      data: offer // Pasa la oferta laboral al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  verPostulantes(id: number){
    this.router.navigate(['Ofertantes/hub/ver-postulantes/'+id])
  }

  getBackgroundColor(index: number): string {
    const colors = ['#FFE4C4', '#FFB6C1', '#98FB98'];
    return colors[index % colors.length];
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  createNewOffer(): void {
    this.router.navigate(['/Ofertantes/hub/crear-ofertas']);
  }

  showPopularityChart(): void {
    if (!this.userId) {
      this.showSnackBar('Error: No se pudo identificar el usuario');
      return;
    }
  
    this.ofertantesService.getJobOffersPopularity(this.userId).subscribe({
      next: (data) => {
        // Encuentra el trabajo más popular
        const max = data.reduce((prev, current) => (current.applicantsCount > prev.applicantsCount ? current : prev), data[0]);
        this.mostPopularJob = { name: max.jobTitle, applicants: max.applicantsCount };
  
        // Generar la gráfica
        if (this.popularityChart) {
          this.popularityChart.destroy();
        }
  
        const ctx = document.getElementById('popularityChart') as HTMLCanvasElement;
        this.popularityChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map((item) => item.jobTitle),
            datasets: [
              {
                label: 'Cantidad de Postulantes',
                data: data.map((item) => item.applicantsCount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      error: () => {
        this.showSnackBar('Error al cargar la gráfica de popularidad');
      },
    });
  }
  
} 

