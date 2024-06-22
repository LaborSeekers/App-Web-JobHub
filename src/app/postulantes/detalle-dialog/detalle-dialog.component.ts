import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { ReputacionDialogComponent } from '../reputacion-dialog/reputacion-dialog.component';

@Component({
  selector: 'app-detalle-dialog',
  templateUrl: './detalle-dialog.component.html',
  styleUrl: './detalle-dialog.component.css'
})
export class DetalleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {}

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
}
