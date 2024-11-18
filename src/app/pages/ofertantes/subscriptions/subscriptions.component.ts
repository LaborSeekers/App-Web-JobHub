import { CheckoutService } from './../../../core/services/checkout.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component } from '@angular/core';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionsModalComponent } from '../subscriptions-modal/subscriptions-modal.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent {
  subscription: any | null = null;
  newSubscription: { paymentFrequency?: string } = {};
  isLoadingSubscriptions: boolean = false;
  isLoadingPayment: boolean = false;
  isLoadingCancel: boolean = false;

  constructor(private subscriptionService: SubscriptionService,
    private dialog: MatDialog,
    private authService: AuthService,
    private CheckoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.subscriptionService.getSubscriptionObservable().subscribe({
      next: (subscription) =>{
        this.subscription = subscription;
      }
    })

    this.subscriptionService.getLoadingObservable().subscribe({
      next: (loading) => {
        this.isLoadingSubscriptions = loading;
      }
    })
  }

  openSubscriptionDialog(): void {
    const dialogRef = this.dialog.open(SubscriptionsModalComponent, {
      width: '400px',   // Ancho del modal
      height: 'auto',   // Alto automático según el contenido
      maxWidth: '90vw', // Máximo ancho relativo al viewport
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newSubscription.paymentFrequency = result;
        this.createSubscription();
      }
    });
  }

  getSubscriptionStatus(status: string){
    switch(status){
      case "ACTIVE":
        return "Activa"
      case "INACTIVE":
        return "Inactiva"
      case "CANCELLED":
        return "Cancelada"
    }
    return "Indefinida"
  }

  renewSubscription(): void {
    // Implementa la lógica para renovar la suscripción aquí
  }

  cancelSubscription(): void {
    this.isLoadingCancel = true;
    this.subscriptionService.cancelSubscription(this.subscription.id).subscribe({
      next: ()=>{
        this.subscriptionService.loadSubscription(this.authService.getUserInfo().userRoleId);
        this.isLoadingCancel = false;
      }
    })
  }

  createSubscription(): void {
    this.subscriptionService.createSubscription(this.authService.getUserInfo().userRoleId, this.newSubscription.paymentFrequency!).subscribe({
      next: (subscription) => {
        this.subscription = subscription;
      }
    });
  }

  createPaymentOrder(): void {
    this.isLoadingPayment = true;
    this.CheckoutService.createOrder(this.subscription.id).subscribe({
      next: (response) => {
        window.location.href = response.paypalUrl;
      }
    })
  }

  
}
