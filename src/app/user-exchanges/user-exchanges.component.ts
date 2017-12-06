import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericService } from '../generic.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-exchanges',
  templateUrl: './user-exchanges.component.html',
  styleUrls: ['./user-exchanges.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserExchangesComponent implements OnInit {

  exchanges:  any[];
  errorMessage: String;
  public pageInformations: any;
  public pagesArray: any;
  public exchange: any;

  constructor(private _genericService: GenericService, public _authService: AuthService) { }

  ngOnInit() {

    this.fetchexchanges(0);
  }

  fetchexchanges(page: number): void {

        console.log('fetchexchanges function call : page = ' + page );
        this._genericService.findAll(environment.userExchangesResourceUrl, true, page)
        .subscribe(
          data => this.then(data),
          error => this.errorMessage = <any>error
        );
      }

      then(response) {
        this.exchanges = response.content;
        this.pageInformations = this._genericService.setPagesInformations(response);

        this.pagesArray = new Array(this.pageInformations.totalPages);
        for ( let i = 0 ; i < this.pageInformations.totalPages; i ++ ) {
            this.pagesArray[i] = i;
        }
      }
}
