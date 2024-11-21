import { AlertasService } from './../../../core/services/alertas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Alerta {
  jobOfferID: number,
  jobTitle: string,
  jobLocation: string;
  jobLogo: string,
  jobSalary: string;
  jobModality: string;
  applicationID: number;
  dateCreated: string;
  content: string;
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
  dataSource = new MatTableDataSource<Alerta>();

  alertas:Alerta[] = []

  DataSourceCopy = [...this.dataSource.data];
  deletedRows: Alerta[] = [];
  expandedElement: Alerta | null = null;
  showUndoButton = false;
  progress = 0;
  progressInterval: any;

  constructor( public dialog: MatDialog,
    private AlertasService:AlertasService
  ) {
  }

  ngOnInit(){
    this.AlertasService.getFeedbacks().subscribe({
      next: (feedbacks)=>{
        this.alertas = feedbacks;
        this.dataSource.data = this.alertas;
      }
    })
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
