import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  private offset        : number;
  private limit         : number;
  private total         : number;
  private currentPage   : number=1;
  private pages         : any=[];
  private threshold     = 1;
  private thresholdDown : number=1;
  private thresholdUp   : number=2;

  constructor() {
    if(window.screen.width > 992){
      this.threshold   = 2;
      this.thresholdUp = 3;
    };

  }

  public getOffset(){
    return this.offset;
  }

  public setOffset(){
      this.offset = this.limit * (this.currentPage - 1);
  }

  public getLimit(){
      return this.limit;
  }

  public setLimit(limit: number){
      this.limit = limit;
  }

  public getTotal(){
      return this.total;
  }

  public setTotal(total: number){
      this.total = total;
  }

  public getCurrentPage(){
      return this.currentPage;
  }

  public setCurrentPage(currentPage: number){
      if(currentPage > 0 && currentPage <= this.pages[this.pages.length - 1]){
          this.currentPage = currentPage;
          this.setOffset();
          this.setThresholdDown();
          this.setThresholdUp();
      }
  }

  public createPages(){
      let totalPages = Math.ceil(this.total / this.limit);
      
      this.pages = [];
      for(let i = 1; i <= totalPages; i++){
          this.pages.push(i);
      }
  }

  public getPages(){
      return this.pages;
  }

  public getThresholdUp(){
      return this.thresholdUp;
  }

  public getThresholdDown(){
      return this.thresholdDown;
  }

  public setThresholdUp(){
      this.thresholdUp = this.currentPage + this.threshold;
  }

  public setThresholdDown(){
      this.thresholdDown = this.currentPage - this.threshold;
  }

  public reset(){
      this.setCurrentPage(1);
  }
}
