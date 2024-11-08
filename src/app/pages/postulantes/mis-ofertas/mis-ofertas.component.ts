import { ApplicationsService } from './../../../core/services/applications.service';
import { FavoritesService } from './../../../core/services/favorites.service';
import { Component } from '@angular/core';
import { Filters } from '../../../core/models/filters.interface';
import { PostulantesService } from '../../../core/services/postulantes.service';

@Component({
  selector: 'app-mis-ofertas',
  templateUrl: './mis-ofertas.component.html',
  styleUrl: './mis-ofertas.component.css'
})
export class MisOfertasComponent {
  selectedIndex: boolean | null = true;

  isLoading = false;

  data : any;
  currentPage : number = 0;
  pageSize : number = 0;

  favorites : Array<number> = new Array;
  applied : Array<number> = new Array;

  filtrosAplicados: Filters = {
    location: '',
    modality: '',
    status: '',
    title: ''
  };



  constructor( 
    private PostulantesService: PostulantesService,
    private FavoritesService: FavoritesService,
    private ApplicationsService: ApplicationsService) {}

  ngOnInit() {
    this.FavoritesService.getFavoritesIds().subscribe(
      {
        next: (favorites) => {
          this.favorites = favorites;
          if(!this.selectedIndex)
            this.loadOfertas(0,5, this.filtrosAplicados);
        }
      }
    );
    this.ApplicationsService.getAppliedIds().subscribe(
      {
        next: (applied) => {
          this.applied = applied;
          if(this.selectedIndex)
            this.loadOfertas(0,5, this.filtrosAplicados);
        }
      }
    );
  }

  changeIndex(bool: boolean) {
    if(this.selectedIndex == bool)
      return;

    this.selectedIndex = bool;
    this.currentPage = 0;
    this.loadOfertas(0, this.pageSize, this.filtrosAplicados )
  }

  private sortDataByOriginalIds(response: any[], originalIds: Array<number>): any[] {
    const idOrder = Array.from(originalIds);
    return idOrder.map(id => response.find(item => item.id === id)).filter(item => item); // Filtra elementos que no se encontraron
  }

  loadOfertas(page: number, size: number, filter: Filters){
    this.isLoading = true;

    const offersToLoad = this.selectedIndex ? this.applied : this.favorites;
    this.PostulantesService.getJobOffersDetailsByIds(page, size, offersToLoad, filter).subscribe({
      next: (response) => {
        const sortedContent = this.sortDataByOriginalIds(response.content, offersToLoad);
        // Actualiza 'data' con el contenido ordenado
        this.data = {
          ...response,
          content: sortedContent
        };
        this.isLoading = false;
      }
    })
  }

  pageChanged(event: { page: number, size: number }){
    this.currentPage = event.page;
    this.pageSize = event.size;
    this.loadOfertas(this.currentPage, this.pageSize, this.filtrosAplicados);
  }

  recieveFilters(filters: Filters) {
    if (JSON.stringify(this.filtrosAplicados) !== JSON.stringify(filters)) {
      this.filtrosAplicados = filters;
      this.loadOfertas(0, this.pageSize, this.filtrosAplicados);
    }
  }
}
