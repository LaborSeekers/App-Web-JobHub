import { FavoritesService } from './../../../core/services/favorites.service';
import { PostulantesService } from './../../../core/services/postulantes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DetalleDialogComponent } from '../detalle-dialog/detalle-dialog.component';
import { ofertalLaboral } from '../../../core/models/ofertaLaboral.interface';
import { Filters } from '../../../core/models/filters.interface';

@Component({
  selector: 'app-tabla-empleo-fav',
  templateUrl: './tabla-empleo-fav.component.html',
  styleUrls: ['./tabla-empleo-fav.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TablaEmpleoFavComponent implements OnInit {
  isLoading = false;
  data : any;

  //DataSourceCopy = [...this.dataSource.data];
  showUndoButton = false;
  progress = 0;
  progressInterval: any;

  favorites : Array<number> = new Array;
  

  private intervalId: any;

  constructor(
    public dialog: MatDialog, 
    private PostulantesService: PostulantesService,
    private FavoritesService: FavoritesService) {
  }

  filtrosAplicados: Filters = {
    location: '',
    modality: '',
    status: '',
    title: ''
  };
  //ngOnInit() {
    //this.filterForm.valueChanges.subscribe(filters => this.applyFilter(filters));
  //}

  ngOnInit(): void {
    this.FavoritesService.getFavoritesIds().subscribe(
      {
        next: (favorites) => {
          this.favorites = favorites;
          this.loadOfertas(0,5, this.filtrosAplicados);
        }
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.loadOfertas(pageIndex, pageSize, this.filtrosAplicados);
  }

  loadOfertas(page: number, size: number, filter: Filters){
    this.isLoading = true;
    this.PostulantesService.getJobOffersDetailsByIds(page, size, this.favorites, filter).subscribe({
      next: (response) => {
        this.data = response;
        this.isLoading = false;
      }
    })
  }

  pageChanged(event: { page: number, size: number }){
    this.loadOfertas(event.page,event.size, this.filtrosAplicados);
  }
  recieveFilters(filters: Filters) {
    this.filtrosAplicados = filters;
    this.loadOfertas(0, 5, this.filtrosAplicados);
  }
}
