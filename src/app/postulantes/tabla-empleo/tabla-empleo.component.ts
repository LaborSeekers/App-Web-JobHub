import { ofertalLaboral } from './../../models/ofertaLaboral.model';
import { PostulantesService } from './../../services/postulantes.service';
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DetalleDialogComponent } from '../detalle-dialog/detalle-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


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
  
  dataSource: MatTableDataSource<ofertalLaboral> = new MatTableDataSource<ofertalLaboral>();
  DataSourceCopy = [...this.dataSource.data];
  deletedRows: ofertalLaboral[] = [];
  expandedElement: ofertalLaboral | null = null;
  showUndoButton = false;
  progress = 0;
  progressInterval: any;
  constructor(public dialog: MatDialog,private PostulantesService :PostulantesService) {}

  loadOfertas():void{
    this.PostulantesService.getAllOfertasLabo().subscribe(ofertalLaboral =>{
      this.dataSource.data=ofertalLaboral;
    })
  }

  ngOnInit(): void {
    this.loadOfertas();
    
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


  verDetalles(element: ofertalLaboral, event: MouseEvent) {
    event.stopPropagation();
    this.openDialog(element);
  }

  openDialog(element: ofertalLaboral): void {
    this.dialog.open(DetalleDialogComponent, {
      width: 'auto',
      data: element
    });
  }
}