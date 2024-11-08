import { AuthService } from './../../../core/services/auth.service';
import { SubscriptionService } from './../../../core/services/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from './../../../core/services/checkout.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-check',
  templateUrl: './subscription-check.component.html',
  styleUrl: './subscription-check.component.css'
})
export class SubscriptionCheckComponent {

  constructor(
    private SubscriptionService: SubscriptionService,
    private CheckoutService: CheckoutService,
    private AuthService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    const token = this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('token');

    if(token && payerId){
      this.CheckoutService.captureOrder(token).subscribe({
        next: (response) => {
          if(response.completed) {
            this.SubscriptionService.loadSubscription(this.AuthService.getUserInfo().userRoleId);
            this.router.navigate(["/Ofertantes/hub/subscripcion"])
          }
        }
      });
    }
  }
}
