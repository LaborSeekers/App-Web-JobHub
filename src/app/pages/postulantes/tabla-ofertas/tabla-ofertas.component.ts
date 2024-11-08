import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';
import { DetalleDialogComponent } from '../detalle-dialog/detalle-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { PostulantesService } from '../../../core/services/postulantes.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Filters } from '../../../core/models/filters.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationsService } from '../../../core/services/applications.service';

@Component({
  selector: 'app-tabla-ofertas',
  templateUrl: './tabla-ofertas.component.html',
  styleUrl: './tabla-ofertas.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TablaOfertasComponent {
  displayedColumns: string[] = ['puesto', 'reputacion', 'fecha', 'estado', 'accion'];
  
  @Input() data:any;
  @Input() isLoading = true;
  @Input() recomendations = false;
  
  @Output() filtersChanged = new EventEmitter<Filters>();
  @Output() pageChanged = new EventEmitter<{ page: number, size: number }>();
  
  dataSource: MatTableDataSource<ofertalLaboral> = new MatTableDataSource<ofertalLaboral>();

  filters: Filters = {
    location: '',
    modality: '',
    status: '',
    title: ''
  };

  //DataSourceCopy = [...this.dataSource.data];
  //deletedRows: ofertalLaboral[] = [];
  expandedElement: ofertalLaboral | null = null;
  //showUndoButton = false;
  //progress = 0;
  //progressInterval: any;
  totalElements: number = 0;

  favorites : Array<number> = new Array;
  applied : Array<number> = new Array;

  filterForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private datePipe:DatePipe,
    private favoriteService: FavoritesService,
    private applicationsService: ApplicationsService,
    private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      title: [''],
      status: [''],
      location:[''],
      modality:['']
    });
  }

  ngOnInit(){
    this.favoriteService.getFavoritesIds().subscribe(
      {
        next: (favorites) => {
          this.favorites = favorites;
        }
      }
    );
    this.applicationsService.getAppliedIds().subscribe(
      {
        next: (applied) => {
          this.applied = applied;
        }
      }
    );
  }

  applyFilters(){

    if (this.filterForm.valid) {
    this.filters.location = this.filterForm.value.location || '';
    this.filters.modality = this.filterForm.value.modality || '';
    this.filters.status = this.filterForm.value.status || '';
    this.filters.title = this.filterForm.value.title || '';
    this.filtersChanged.emit(this.filters)
    }
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.pageChanged.emit({page:pageIndex, size: pageSize});
  }


  ngOnChanges(): void {
    if(this.data != null){
      let content = this.recomendations? this.data : this.data.content;
        
      this.totalElements = this.data.page?.totalElements;
      this.dataSource.data = content.map((element:ofertalLaboral) => {
        // Manipula los elementos según sea necesario
        element.requisitos = element.requirements.split(',');
        element.beneficios = element.benefits.split(',');
        element.createdAt = this.datePipe.transform(element.createdAt, 'MMMM d, y HH:mm') ?? "Fecha no disponible";
        element.reputation = this.getReputationLabel(element.reputation)
        element.isFavorite = this.favorites.includes(element.id);
        element.isApplied = this.applied.includes(element.id);
        return element; // Devuelve el elemento modificado
      });
    }
  }

  

  verDetalles(element: ofertalLaboral, event: MouseEvent) {
    event.stopPropagation();
    console.log("holaaa" , element)
    this.openDialog(element);
  }

  openDialog(element: ofertalLaboral): void {
    this.dialog.open(DetalleDialogComponent, {
      width: 'auto',
      data: element
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'ACTIVO';
      case 'CANCELLED':
        return 'CANCELADO';
      case 'INACTIVE':
        return 'INACTIVO';
      default:
        return status;
    }
  }

  getReputationLabel(reputation: string): string {
    switch (reputation) {
      case 'MUY_ALTA':
        return 'MUY ALTA';
      default:
        return reputation;
    }
  }

}
