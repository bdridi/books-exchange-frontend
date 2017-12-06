import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OffersComponent implements OnInit {

  public allOffers: any[];
  private errorMessage: string;
  private resource: String = 'plainOffers';
  public pageInformations = {
    last : false,
    totalPages : 0,
    totalElements: 0,
    sort: null,
    numberOfElements: 0,
    first: false,
    number: 0
  };
  public pagesArray: any;


  constructor(private _genericService: GenericService) { }

  ngOnInit() {
    console.log('Initializing Offers component');
    this.fetchAllOffers(0);
  }

  fetchAllOffers(page: number): void {
    console.log('fetchOffer function call');
    this._genericService.findAll(this.resource, false, page)
    .subscribe(
      data => this.then(data),
      error => this.errorMessage = <any>error
    );

  }


  then(response) {

        this.allOffers = response.content;
        // pageable information
        this.pageInformations.last = response.last;
        this.pageInformations.totalPages = response.totalPages;
        this.pageInformations.totalElements = response.totalElements;
        this.pageInformations.sort = response.sort;
        this.pageInformations.numberOfElements = response.numberOfElements;
        this.pageInformations.first = response.first;
        this.pageInformations.number = response.number;
        console.log('totalPages : ' + this.pageInformations.totalPages);
        this.pagesArray = new Array(this.pageInformations.totalPages);
        for ( let i = 0 ; i < this.pageInformations.totalPages; i ++ ) {
            this.pagesArray[i] = i;
        }
      }

  previous() {
    // todo
  }

}
