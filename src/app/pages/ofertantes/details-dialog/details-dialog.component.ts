import { ApplicationsService } from './../../../core/services/applications.service';
import { FavoritesService } from './../../../core/services/favorites.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.css'
})
export class DetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ofertalLaboral,
      public dialog: MatDialog, 
      private ApplicationsService: ApplicationsService,
      private FavoritesService: FavoritesService,
      private AuthService: AuthService,
      private router:Router,
      public dialogRef: MatDialogRef<DetailsDialogComponent>
  ) {}

  isLoadingFav: boolean = false;
  isLoadingApp: boolean = false;

  showmodal: boolean = false;
  setRepu(element: Data, event: MouseEvent){  
    event.stopPropagation();
    this.openDialog(element);
  }
  editOffer(id: number){
    this.showmodal = false;
    this.dialogRef.close();
    this.router.navigate(['Ofertantes/hub/edit/'+id]);
  }


  openDialog(element: Data): void {
    this.dialog.open(DetailsDialogComponent, {
      width: '90%', // Increase the width to 90% of the viewport
      maxWidth: '1200px', // Set a maximum width
      panelClass: 'wide-dialog', // Add this line
      data: element
    });
  }

  returnMainPage(){
    this.showmodal = false;
    this.dialogRef.close();
  }
}
