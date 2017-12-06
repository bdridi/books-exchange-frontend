import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericService } from '../generic.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserBooksComponent implements OnInit {

  offers:  any[];
  errorMessage: String;
  public pageInformations: any;
  public pagesArray: any;
  public exchange: any;
  public successMessage = '';

  constructor(private _genericService: GenericService) { }

  ngOnInit() {

    this.fetchoffers(0);
  }

  fetchoffers(page: number): void {

        console.log('fetchoffers function call : page = ' + page );
        this._genericService.findAll(environment.userOffersResourceUrl, true, page)
        .subscribe(
          data => this.then(data),
          error => this.errorMessage = <any>error
        );
      }

      then(response) {
        this.offers = response.content;
        this.pageInformations = this._genericService.setPagesInformations(response);

        this.pagesArray = new Array(this.pageInformations.totalPages);
        for ( let i = 0 ; i < this.pageInformations.totalPages; i ++ ) {
            this.pagesArray[i] = i;
        }
      }
}
