import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DetalleDialogComponent } from '../detalle-dialog/detalle-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface Empleo {
  logo: string;
  puesto: string;
  location: string;
  salary: string;
  type: string;
  reputacion: string;
  fecha: string;
  estado: string;
  descripcion: string;
  requisitos: string[];
  beneficios: string[];
  puestoIMG: string;
  jornadaIMG: string;
  ubicacionIMG: string;
  sueldoIMG: string;
}

interface EmpleoFilters {
  [key: string]: string;
}

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
  dataSource = new MatTableDataSource<Empleo>([
    {
      logo: 'assets/imagenes/Tabla/interbank.png',
      puesto: 'Data Scientist Senior de Riesgos',
      location: 'Javier Prado, Lima',
      salary: '$2k-5k al mes',
      type: 'Full Time',
      reputacion: 'Muy Alta',
      fecha: 'Abril 15, 2024 14:35',
      estado: 'Activo',
      descripcion: 'En Interbank estamos buscando sumar a nuestros equipos a los mejores talentos para seguir convirtiéndonos en el mejor banco a partir de las mejores personas y trabajar juntos por nuestro propósito de acompañar a los peruanos a cumplir sus sueños, hoy. Por ello, estamos en búsqueda de talentos que quieran sumarse a la Gerencia de Data Science asumiendo el rol Data Scientist de Riesgos.',
      requisitos: [
        "Profesional de Estadística, Ingeniería, Económicas o afines.",
        "5 años de experiencia habiendo llevado proyectos de modelamiento de datos de principio a fin, de preferencia experiencia en sector Banca, Finanzas, Retail, Telecomunicaciones, Consumo Masivo u otros.",
        "2 años de experiencia liderando equipos.",
        "Conocimiento de: Negocio Financiero, desde el punto de vista funcional, Estadística/Matemática (intermedio), manejo de proyectos, desarrollo de presentaciones efectivas.",
        "MBA o Gestión de proyectos (deseable)",
        "Lenguajes de programación: R, PHYTON",
        "Base de datos: SQL",
        "Cloud: AWS, Azure o Google"],
        beneficios: [
          "Ser parte de la aceleración de la transformación digital de una de las empresas más importantes del Perú.",
          "Oportunidades de desarrollo y aprendizaje continuo.",
          "Acceso a nuestro modelo de trabajo flexible 'Interbank Eres'.",
          "Remuneración competitiva."],
        puestoIMG:'assets/imagenes/Tabla/Detalles/Puesto.png',
        jornadaIMG:'assets/imagenes/Tabla/Detalles/Reloj.png',
        ubicacionIMG:'assets/imagenes/Tabla/Detalles/Ubicacion.png',
        sueldoIMG:'assets/imagenes/Tabla/Detalles/sueldo.png'
    },
    {
      logo: 'assets/imagenes/Tabla/tlogo.png',
      puesto: 'Desarrollador Java',
      location: 'San Isidro, Lima',
      salary: '$1k-3k al mes',
      type: 'Full Time Remoto',
      reputacion: 'Baja',
      fecha: 'Abril 2, 2024 20:18',
      estado: 'Cancelado',
      descripcion: 'Desarrolla aplicaciones Java en un entorno de trabajo remoto.',
      requisitos: [],
      beneficios: [],
      puestoIMG:'assets/imagenes/Tabla/Detalles/Puesto.png',
      jornadaIMG:'assets/imagenes/Tabla/Detalles/Reloj.png',
      ubicacionIMG:'assets/imagenes/Tabla/Detalles/Ubicacion.png',
      sueldoIMG:'assets/imagenes/Tabla/Detalles/sueldo.png'
    },
    {
      logo: 'assets/imagenes/Tabla/delsofi.png',
      puesto: 'Data Engineer - Gestión',
      location: 'Miraflores, Lima',
      salary: '$1k-3k al mes',
      type: 'Full Time',
      reputacion: 'Media',
      fecha: 'Mar 2 , 2023 15:30',
      estado: 'Finalizado',
      descripcion: 'Encargado de la gestión y el procesamiento de datos.',
      requisitos: [],
      beneficios: [],
      puestoIMG:'assets/imagenes/Tabla/Detalles/Puesto.png',
      jornadaIMG:'assets/imagenes/Tabla/Detalles/Reloj.png',
      ubicacionIMG:'assets/imagenes/Tabla/Detalles/Ubicacion.png',
      sueldoIMG:'assets/imagenes/Tabla/Detalles/sueldo.png'
    },
    {
      logo: 'assets/imagenes/Tabla/bbva.png',
      puesto: 'Data Advanced Analytics',
      location: 'Javier Prado, Lima',
      salary: '$5k-7k al mes',
      type: 'Full-Time Híbrido',
      reputacion: 'Alta',
      fecha: 'Mar 27 , 2023 11:45',
      estado: 'Activo',
      descripcion: 'Analiza datos avanzados para obtener insights empresariales.',
      requisitos: [],
      beneficios: [],
      puestoIMG:'assets/imagenes/Tabla/Detalles/Puesto.png',
      jornadaIMG:'assets/imagenes/Tabla/Detalles/Reloj.png',
      ubicacionIMG:'assets/imagenes/Tabla/Detalles/Ubicacion.png',
      sueldoIMG:'assets/imagenes/Tabla/Detalles/sueldo.png'
    }
  ]);

  DataSourceCopy = [...this.dataSource.data];
  deletedRows: Empleo[] = [];
  expandedElement: Empleo | null = null;
  showUndoButton = false;
  progress = 0;
  progressInterval: any;
  constructor(public dialog: MatDialog) {}
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

  verDetalles(element: Empleo, event: MouseEvent) {
    event.stopPropagation();
    this.openDialog(element);
  }

  openDialog(element: Empleo): void {
    this.dialog.open(DetalleDialogComponent, {
      width: 'auto',
      data: element
    });
  }
}