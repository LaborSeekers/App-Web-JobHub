import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-tabla-empleo',
  templateUrl: './tabla-empleo.component.html',
  styleUrls: ['./tabla-empleo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TablaEmpleoComponent {
  displayedColumns: string[] = ['puesto', 'reputacion', 'fecha', 'estado', 'accion'];
  dataSource = [
    {
      logo: 'path/to/logo1.png',
      puesto: 'Data Scientist Senior de Riesgos',
      location: 'Javier Prado, Lima',
      salary: '$2k-5k al mes',
      type: 'Full Time',
      reputacion: 'assets/imagenes/medidor.png',
      fecha: 'Abril 15, 2024 14:35',
      estado: 'Active',
      descripcion: 'Responsable de gestionar y analizar datos para identificar riesgos.'
    },
    {
      logo: 'path/to/logo2.png',
      puesto: 'Desarrollador Java',
      location: 'San Isidro, Lima',
      salary: '$1k-3k al mes',
      type: 'Full Time Remoto',
      reputacion: 'assets/imagenes/medidor.png',
      fecha: 'Abril 2, 2024 20:18',
      estado: 'Cancelado',
      descripcion: 'Desarrolla aplicaciones Java en un entorno de trabajo remoto.'
    },
    {
      logo: 'path/to/logo3.png',
      puesto: 'Data Engineer - Gestión',
      location: 'Miraflores, Lima',
      salary: '$1k-3k al mes',
      type: 'Full Time',
      reputacion: 'assets/imagenes/medidor.png',
      fecha: 'Mar 2 , 2023 15:30',
      estado: 'Finalizado',
      descripcion: 'Encargado de la gestión y el procesamiento de datos.'
    },
    {
      logo: 'path/to/logo4.png',
      puesto: 'Data Advanced Analytics',
      location: 'Javier Prado, Lima',
      salary: '$5k-7k al mes',
      type: 'Full-Time Híbrido',
      reputacion: 'assets/imagenes/medidor.png',
      fecha: 'Mar 27 , 2023 11:45',
      estado: 'Active',
      descripcion: 'Analiza datos avanzados para obtener insights empresariales.'
    }
  ];

  expandedElement: any | null;

  toggleRow(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  verDetalles(element: any) {
    console.log('Ver detalles', element);
  }
}
