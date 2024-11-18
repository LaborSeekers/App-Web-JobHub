import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresasService } from '../../../core/services/empresa.service';
import { Empresa } from '../../../core/models/user-info.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrl: './ver-empresa.component.css'
})
export class VerEmpresaComponent implements OnInit {
  empresa: Empresa | null = null;

  constructor(
    private route: ActivatedRoute,
    private empresasService: EmpresasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const empresaId = params.get('Id');
      if (empresaId) {
        this.empresasService.getEmpresaById(+empresaId).subscribe({
          next: (empresa) => {
            
            this.empresa = empresa;
          },
          error: (error) => {
          }
        });
      }
    });
  }

  gotoBack() {
    this.location.back(); // Esto te lleva a la página anterior
  }
}