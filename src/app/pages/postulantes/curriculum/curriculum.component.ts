import { UserService } from './../../../core/services/user.service';
import { PostulantesService } from './../../../core/services/postulantes.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {
  constructor(private postulantesService: PostulantesService, private AuthService: AuthService ) { }

  /*ngOnInit(): void{
    
    this.postulantesService.getCurriculum(this.AuthService.getUserInfo().userRoleId).subscribe(curriculum => {
      console.log(curriculum);//retorna correctamente el curriculum
  });}*/


}
