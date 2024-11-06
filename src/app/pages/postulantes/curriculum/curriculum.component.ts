import { UserService } from './../../../core/services/user.service';
import { PostulantesService } from './../../../core/services/postulantes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {
  userID = this.userS.getUserId()
  constructor(private postulantesService: PostulantesService, private userS: UserService) { }

  ngOnInit(): void{
    
    this.postulantesService.getCurriculum(1).subscribe(curriculum => {
      console.log(curriculum);
  });}

  
}
