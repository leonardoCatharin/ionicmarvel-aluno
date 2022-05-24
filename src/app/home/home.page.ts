import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { CharacterService } from './../provider/character.service';
import { PaginationComponent } from '../util/pagination/pagination.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    public filtro = {
      descricao: '',
      bkp      : ''
    }

    public characters = [];
    public pagination = new PaginationComponent();
    public checking = false;

    constructor(private characterService: CharacterService, 
                private navCtrl: NavController){
      this.pagination.setLimit(10);
      this.getAllCharacters();
    }


    public getAllCharacters(){
      this.checking = true;

      if(this.filtro.descricao != this.filtro.bkp){
        this.pagination.reset();
      }

      this.characterService.getAllCharacters(this.pagination , this.filtro.descricao)
      .then((characters:any) => {
        console.log(characters);
        this.filtro.bkp = this.filtro.descricao;
        this.characters = [];
        this.characters = characters;
        this.checking = false;
      });

    }

    public goDetails(character: any) {
      this.navCtrl.navigateForward('character', {
        queryParams: { id : character.id }
      });
    }

     /* métodos relacionados à paginação */
      public goFirstPage(){
        this.pagination.setCurrentPage(1);
        this.getAllCharacters();
      }

      public goLastPage(){
          this.pagination.setCurrentPage(this.pagination.getPages()[this.pagination.getPages().length - 1]);
          this.getAllCharacters();
      }

      public goPreviousPage(){
          this.pagination.setCurrentPage(this.pagination.getCurrentPage() - 1);
          this.getAllCharacters();
      }

      public goNextPage(){
          this.pagination.setCurrentPage(this.pagination.getCurrentPage() + 1);
          this.getAllCharacters();
      }

      public goPage(page: number){
          this.pagination.setCurrentPage(page);
          this.getAllCharacters();
      }
      /* --- */
}
