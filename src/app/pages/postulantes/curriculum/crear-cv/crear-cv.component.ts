import { Component } from '@angular/core';
import { EditarCurriculumComponent } from '../editar-curriculum/editar-curriculum.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cv',
  templateUrl: './crear-cv.component.html',
  styleUrl: './crear-cv.component.css'
})
export class CrearCvComponent {
  constructor(public dialog: MatDialog) {
   
  }
  verDetalles( event: MouseEvent) {
    event.stopPropagation();
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(EditarCurriculumComponent, {
      width: 'auto',
      maxHeight: '80vh'
    });
  }
}
