import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './pages/auth/auth.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { PostulantesModule } from './pages/postulantes/postulantes.module';
import { OfertantesModule } from './pages/ofertantes/ofertantes.module';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './core/interceptors/user.interceptor';
import { FormsModule } from '@angular/forms'; 
import { OtpVerificationComponent } from './pages/auth/OTP/otp-verification.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { CategoryChartDialogComponent } from './pages/postulantes/ofertas-de-trabajo/category-chart-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    OtpVerificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    MaterialModule,
    PostulantesModule,
    OfertantesModule,
    FormsModule, 
  ],
  providers: [
    provideAnimationsAsync(),
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
