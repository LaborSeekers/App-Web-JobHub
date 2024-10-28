import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import { ReputacionDialogComponent } from '../reputacion-dialog/reputacion-dialog.component';
import { PostulantesService } from '../../../core/services/postulantes.service';
import { UserService } from '../../../core/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-detalle-dialog',
  templateUrl: './detalle-dialog.component.html',
  styleUrl: './detalle-dialog.component.css'
})
export class DetalleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private PostulantesService :PostulantesService,
  private userService: UserService,private router:Router,
  public dialogRef: MatDialogRef<DetalleDialogComponent>
) {}

  showmodal: boolean = false;
  setRepu(element: Data, event: MouseEvent){  
    event.stopPropagation();
    this.openDialog(element);
  }
  openDialog(element: Data): void {
    this.dialog.open(ReputacionDialogComponent, {
      width: '700px',
      height: '360px'   ,
      data: element
    });
  }
  
  postularOferta(ofertaId: number): void {
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
  }
  returnMainPage(){
    this.router.navigate(['/Postulantes']);
    this.showmodal = false;
    this.dialogRef.close();
  }
  
}
