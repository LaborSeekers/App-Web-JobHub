import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reputacion-dialog',
  templateUrl: './reputacion-dialog.component.html',
  styleUrl: './reputacion-dialog.component.css'
})
export class ReputacionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {}
}
