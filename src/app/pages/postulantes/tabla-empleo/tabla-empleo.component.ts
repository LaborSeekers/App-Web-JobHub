import { AlertasService } from './../../../core/services/alertas.service';
import { ApplicationsService } from './../../../core/services/applications.service';
import { FavoritesService } from './../../../core/services/favorites.service';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';
import { PostulantesService } from '../../../core/services/postulantes.service';
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DetalleDialogComponent } from '../detalle-dialog/detalle-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-tabla-empleo',
  templateUrl: './tabla-empleo.component.html',
  styleUrls: ['./tabla-empleo.component.css'],
})
export class TablaEmpleoComponent {  
  data: any;

  isLoading = true;
  username: string= '';

  favorites_num : number = 0;
  applied_num : number = 0;
  alertas_num : number = 0;
  constructor(private postulantesService :PostulantesService,
    private FavoritesService: FavoritesService,
    private ApplicationsService: ApplicationsService,
    private AlertasService: AlertasService,
    private authService: AuthService
  ) {}

  loadOfertas():void{
    this.postulantesService.getOfertasRecomendadas().subscribe({
      next: (ofertaLaboral) => {
        this.data = ofertaLaboral;
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.FavoritesService.getFavoritesIds().subscribe({
      next: (favorites) => {
        this.favorites_num = favorites.length;
      }})
    this.ApplicationsService.getAppliedIds().subscribe({
      next: (applications) => {
        this.applied_num = applications.length;
      }
    })
    this.AlertasService.getFeedbacks().subscribe({
      next: (feedbacks)=>{
        this.alertas_num = feedbacks.length;
      }
    })

    this.username = this.authService.getUserInfo().firstName + " "+this.authService.getUserInfo().lastName 

    this.loadOfertas();
  }

}