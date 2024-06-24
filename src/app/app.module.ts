
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // Add this line
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegisterComponent } from './login/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PostulantesModule } from './postulantes/postulantes.module';
import { OfertantesModule } from './ofertantes/ofertantes.module';
import { CrearCvComponent } from './postulantes/curriculum/crear-cv/crear-cv.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent

   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ReactiveFormsModule,
    MaterialModule,
    PostulantesModule,
    OfertantesModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
