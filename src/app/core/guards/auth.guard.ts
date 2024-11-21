import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  
  const storedInfo = localStorage.getItem("UserInfo");

  const router = inject(Router); 

  if(storedInfo){
    const user = JSON.parse(storedInfo);
    const role = user.role;
    switch(role){
      case "ADMIN":
        router.navigate(['/Admin']); // falta /Admin
        break;
      case "POSTULANTE":
        router.navigate(['/Postulantes']);
        break;
      case "OFERTANTE":
        router.navigate(['/Ofertantes']);
    }
    return false
  }
    router.navigate([''])
  return true;
  

  
};
