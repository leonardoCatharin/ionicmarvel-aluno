import { Injectable } from '@angular/core';
import { ServiceService } from '../api/service.service';
import { PaginationComponent } from './../util/pagination/pagination.component';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private service: ServiceService) { }

  /* atualiza as informações de paginação */
  private updatePagination(pagination: PaginationComponent, data: any){
    pagination.setTotal(data.total);
    pagination.setLimit(data.limit);
    pagination.createPages();
  }
}
