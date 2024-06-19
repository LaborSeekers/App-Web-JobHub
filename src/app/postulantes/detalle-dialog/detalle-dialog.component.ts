import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-dialog',
  templateUrl: './detalle-dialog.component.html',
  styleUrl: './detalle-dialog.component.css'
})
export class DetalleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
