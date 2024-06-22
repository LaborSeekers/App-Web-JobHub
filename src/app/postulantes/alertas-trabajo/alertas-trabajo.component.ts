import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Alerta {
  logo: string;
  puesto: string;
  location: string;
  salary: string;
  type: string;
  mensaje:string;
  descripcion: string;
}


@Component({
  selector: 'app-alertas-trabajo',
  templateUrl: './alertas-trabajo.component.html',
  styleUrl: './alertas-trabajo.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AlertasTrabajoComponent {
  displayedColumns: string[] = ['puesto','mensaje'];
  dataSource = new MatTableDataSource<Alerta>([
    {
      logo: 'assets/imagenes/Tabla/interbank.png',
      puesto: 'Data Scientist Senior de Riesgos',
      location: 'Javier Prado, Lima',
      salary: '$2k-5k al mes',
      type: 'Full Time',
      mensaje:'Felicidades, has pasado a la siguiente etapa en el proceso de selección del puesto de Data Scientist Senior de Riesgos de la empresa Interbanck',
      descripcion: 'En Interbank estamos buscando sumar a nuestros equipos a los mejores talentos para seguir convirtiéndonos en el mejor banco a partir de las mejores personas y trabajar juntos por nuestro propósito de acompañar a los peruanos a cumplir sus sueños, hoy. Por ello, estamos en búsqueda de talentos que quieran sumarse a la Gerencia de Data Science asumiendo el rol Data Scientist de Riesgos.',
    },
    {
      logo: 'assets/imagenes/Tabla/tlogo.png',
      puesto: 'Desarrollador Java',
      location: 'San Isidro, Lima',
      salary: '$1k-3k al mes',
      type: 'Full Time Remoto',
      mensaje:'El proceso de selección de la empresa T ha sido cancelado',
      descripcion: 'Desarrolla aplicaciones Java en un entorno de trabajo remoto.',
    },
    {
      logo: 'assets/imagenes/Tabla/delsofi.png',
      puesto: 'Data Engineer - Gestión',
      location: 'Miraflores, Lima',
      salary: '$1k-3k al mes',
      type: 'Full Time',
      mensaje:'El proceso de selección para el puesto Data Engineer de la empresa Delfosti ha finalizado',
      descripcion: 'Encargado de la gestión y el procesamiento de datos.',
      
    },
    {
      logo: 'assets/imagenes/Tabla/bbva.png',
      puesto: 'Data Advanced Analytics',
      location: 'Javier Prado, Lima',
      salary: '$5k-7k al mes',
      type: 'Full-Time Híbrido',
      mensaje:'Tienes una entrevista pendiente dentro de dos días',
      descripcion: 'Analiza datos avanzados para obtener insights empresariales.',
    }
  ]);

  DataSourceCopy = [...this.dataSource.data];
  deletedRows: Alerta[] = [];
  expandedElement: Alerta | null = null;
  showUndoButton = false;
  progress = 0;
  progressInterval: any;

  constructor( public dialog: MatDialog) {
  }

  removeData(index: number, event: MouseEvent) {
    event.stopPropagation();
    const deletedItem = this.dataSource.data.splice(index, 1)[0];
    this.deletedRows.push(deletedItem);
    this.dataSource.data = [...this.dataSource.data];
    this.startProgress();
  }

  startProgress() {
    this.progress = 0;
    this.showUndoButton = true;

    this.progressInterval = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        clearInterval(this.progressInterval);
        this.showUndoButton = false;
      }
    }, 50);
  }

  undoDelete() {
    if (this.deletedRows.length > 0) {
      const lastDeletedItem = this.deletedRows.pop();
      if (lastDeletedItem) {
        this.dataSource.data.push(lastDeletedItem);
        this.dataSource.data = [...this.dataSource.data];
        this.showUndoButton = false;
        clearInterval(this.progressInterval);
      }
    }
  }
}
