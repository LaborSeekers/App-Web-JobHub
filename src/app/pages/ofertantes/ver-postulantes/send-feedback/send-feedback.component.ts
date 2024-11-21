import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertasService } from '../../../../core/services/alertas.service';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrl: './send-feedback.component.css'
})
export class SendFeedbackComponent {
  feedback: string = '';

  constructor(public dialogRef: MatDialogRef<SendFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertasService: AlertasService) {}

  // Cierra el modal
  closeModal(): void {
    this.dialogRef.close();
  }

  // Función para manejar el envío del feedback
  submitFeedback(): void {
    if (this.feedback.trim()) {
      this.alertasService.enviarFeedback(this.data.id, this.feedback).subscribe({
        next: (feedback) => {
          this.closeModal();
        },
        error: (error) => {
          this.closeModal();
        }
      });
    } else {
      this.closeModal();
    }
  }
}
