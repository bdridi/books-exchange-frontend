import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericService } from '../generic.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sended-requeststs',
  templateUrl: './sended-requeststs.component.html',
  styleUrls: ['./sended-requeststs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SendedRequeststsComponent implements OnInit {

  requests:  any[];
  errorMessage: String;
  public pageInformations: any;
  public pagesArray: any;
  public exchange: any;

  constructor(private _genericService: GenericService) { }

  ngOnInit() {

    this.fetchRequests(0);
  }

  fetchRequests(page: number): void {

        console.log('fetchRequests function call : page = ' + page );
        this._genericService.findAll(environment.sendedRequestsResourceUrl, true, page)
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
}
