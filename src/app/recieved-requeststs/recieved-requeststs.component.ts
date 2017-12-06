import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericService } from '../generic.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-recieved-requeststs',
  templateUrl: './recieved-requeststs.component.html',
  styleUrls: ['./recieved-requeststs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecievedRequeststsComponent implements OnInit {

  requests:  any[];
  errorMessage: String;
  public pageInformations: any;
  public pagesArray: any;
  public exchange: any;
  public successMessage = '';

  constructor(private _genericService: GenericService) { }

  ngOnInit() {

    this.fetchRequests(0);
  }

  fetchRequests(page: number): void {

        console.log('fetchRequests function call : page = ' + page );
        this._genericService.findAll(environment.recievedRequestsResourceUrl, true, page)
        .subscribe(
          data => this.then(data),
          error => this.errorMessage = <any>error
        );
      }

      then(response) {
        this.requests = response.content;
        this.pageInformations = this._genericService.setPagesInformations(response);

        this.pagesArray = new Array(this.pageInformations.totalPages);
        for ( let i = 0 ; i < this.pageInformations.totalPages; i ++ ) {
            this.pagesArray[i] = i;
        }
      }

      accept(id) {
        const obj = {
          request_id: id
        };

        this._genericService.getResourceWithPassingParameter(
          environment.acceptRequestUrl, obj, true, environment.contentTypes.XwwwFormUrlencoded)
        .subscribe(
          data => this.afterAcceptance(data),
          error => this.errorMessage = <any>error
        );
      }

      afterAcceptance(data) {
          this.exchange = data;
          this.fetchRequests(0);
          this.successMessage = ' Exchange established ! Congratulation ' + this.exchange.id;
      }

      decline(id) {
        // todo
      }


}
