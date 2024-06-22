import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-filtro',
  templateUrl: './modal-filtro.component.html',
  styleUrl: './modal-filtro.component.css'
})
export class ModalFiltroComponent {

  profession: string = '';
  studyCenter: string = '';
  experience: string = '';
  location: string = '';
  
  constructor(
    public dialogRef: MatDialogRef<ModalFiltroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilters(): void {
    this.dialogRef.close({profession: this.profession, studyCenter: this.studyCenter, experience: this.experience, location: this.location});
  }
}
