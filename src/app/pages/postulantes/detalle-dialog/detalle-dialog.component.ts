import { ApplicationsService } from './../../../core/services/applications.service';
import { FavoritesService } from './../../../core/services/favorites.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { ReputacionDialogComponent } from '../reputacion-dialog/reputacion-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';
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
      public dialogRef: MatDialogRef<DetalleDialogComponent>
  ) {}

  isLoadingFav: boolean = false;
  isLoadingApp: boolean = false;

  showmodal: boolean = false;
  setRepu(element: Data, event: MouseEvent){  
    event.stopPropagation();
    this.openDialog(element);
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
        console.log(res)
        this.data.isApplied = true;
        this.ApplicationsService.addApplied(res.id, this.data.id);
        this.showmodal = true;
      },
      complete: () => {
        this.isLoadingApp = false;
      }
    })
  }
/*
const userId = this.userService.getUserId();
    if (userId) {
      this.PostulantesService.postularOferta(ofertaId, userId).subscribe(response => {this.showmodal = true;
        console.log('Postulación exitosa', response);
      }, error => {
        console.error('Error al postular', error);
      });
    } else {
      console.error('No se ha encontrado el ID del usuario');
    }
*/
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
          console.error('Error al remover de favoritos', err);
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
          console.error('Error al agregar a favoritos', err);
        },
        complete: () => {
          this.isLoadingFav = false;
        }
      });
    }
  }
}
