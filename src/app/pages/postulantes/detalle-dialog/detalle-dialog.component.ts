import { ApplicationsService } from './../../../core/services/applications.service';
import { FavoritesService } from './../../../core/services/favorites.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import { ReputacionDialogComponent } from '../reputacion-dialog/reputacion-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';
import { EmpresasService } from '../../../core/services/empresa.service';
@Component({
  selector: 'app-detalle-dialog',
  templateUrl: './detalle-dialog.component.html',
  styleUrl: './detalle-dialog.component.css'
})
export class DetalleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ofertalLaboral,
      public dialog: MatDialog, 
      private ApplicationsService: ApplicationsService,
      private FavoritesService: FavoritesService,
      private AuthService: AuthService,
      private EmpresaService: EmpresasService,
      public dialogRef: MatDialogRef<DetalleDialogComponent>,
      private router:Router,

  ) {}

  isLoadingFav: boolean = false;
  isLoadingApp: boolean = false;

  showmodal: boolean = false;
  setRepu(element: Data, event: MouseEvent){  
    event.stopPropagation();
    this.openDialog(element);
  }
  verEmpresa(idOferta: number){
    this.showmodal = false;
    this.dialogRef.close();
  // Suscripción al servicio para obtener la empresa
  this.EmpresaService.getEmpresaByJobOfferId(idOferta).subscribe(
    (empresa) => {
      // Una vez que se obtiene la empresa, se navega a la ruta correspondiente
      this.router.navigate([`Postulantes/hub/ver-empresa/${empresa.id}`]);
    },
    (error) => {
      // Aquí podrías mostrar un mensaje de error si lo necesitas
    }
  );
  }
  openDialog(element: Data): void {
    this.dialog.open(ReputacionDialogComponent, {
      width: '700px',
      height: '360px',
      data: element
    });
  }
  
  postularOferta(): void {
    if (this.isLoadingApp) return;
    this.isLoadingApp = true;

    this.ApplicationsService.addAppliedJobOffer(this.data.id, this.AuthService.getUserInfo().userRoleId).subscribe({
      next:(res) => {
        this.data.isApplied = true;
        this.ApplicationsService.addApplied(res.id, this.data.id);
        this.showmodal = true;
      },
      complete: () => {
        this.isLoadingApp = false;
      }
    })
  }
  retirarPostulacion(){
    if (this.isLoadingApp) return;
    this.isLoadingApp = true;

    this.ApplicationsService.removeAppliedJobOffer(this.data.id, this.AuthService.getUserInfo().userRoleId).subscribe({
      next:() => {
        this.data.isApplied = false;
        this.ApplicationsService.removeApplied(this.data.id);
      },
      complete: () => {
        this.isLoadingApp = false;
      }
    })
  }
  
  returnMainPage(){
    this.showmodal = false;
    this.dialogRef.close();
  }

  toggleFavorite(): void {      
    if (this.isLoadingFav) return;
    this.isLoadingFav = true;

    if (this.data.isFavorite) {
      this.FavoritesService.removeFavoriteJobOffer(this.data.id, this.AuthService.getUserInfo().userRoleId).subscribe({
        next: () => {
          this.data.isFavorite = false;
          this.FavoritesService.removeFavorite(this.data.id);
        },
        error: (err) => {
        },
        complete: () => {
          this.isLoadingFav = false;
        }
      });
    } else {
      this.FavoritesService.addFavoriteJobOffer(this.data.id, this.AuthService.getUserInfo().userRoleId).subscribe({
        next: () => {
          this.data.isFavorite = true;
          this.FavoritesService.addFavorite(this.data.id);
        },
        error: (err) => {
        },
        complete: () => {
          this.isLoadingFav = false;
        }
      });
    }
  }
}
