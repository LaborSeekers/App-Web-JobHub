import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subscriptions-modal',
  templateUrl: './subscriptions-modal.component.html',
  styleUrl: './subscriptions-modal.component.css'
})
export class SubscriptionsModalComponent {
  selectedFrequency: 'MONTHLY' | 'YEARLY' | null = null;

  constructor(public dialogRef: MatDialogRef<SubscriptionsModalComponent>) {}

  confirm(): void {
    this.dialogRef.close(this.selectedFrequency);
  }

  close(): void {
    this.dialogRef.close();
  }
}
