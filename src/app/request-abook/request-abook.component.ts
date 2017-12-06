import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { Offer } from '../entities/offer';
import { Request } from '../entities/request';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OfferService } from '../offer.service';
import { GenericService } from '../generic.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-request-abook',
  templateUrl: './request-abook.component.html',
  styleUrls: ['./request-abook.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestAbookComponent implements OnInit {

  public userOffers: any[];
  public request = new Request();
  private subscription: Subscription;
  public errorMessage: string;
  public successMessage: string;
  private createdRequest: Request;

  constructor(private _authService: AuthService, private _genericService: GenericService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._authService.checkCredentials();
    this.request.exA = -1;
    // get authenticated user offers ;
    this._genericService.findAll(environment.userOffersResourceUrl, true, 0)
    .subscribe(
      data => this.userOffers = data.content,
      error => this.errorMessage = <any>error
    );
    // get exB url parameter

    this.subscription = this._route
    .queryParams
    .subscribe(
      params => this.request.exB = params ['exB']
    );

  }

  save(isValid): void {
    if ( isValid ) {
      // process request exchange
      console.log('process request exchange');
      this._genericService.saveResource(environment.sendBookRequestUrl, this.request, true, environment.contentTypes.XwwwFormUrlencoded)
      .subscribe(
        data => this.then(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  // succes : save
  then(response) {
    this.createdRequest = response;
    this.successMessage = ' Your request has been sent ! We thank you for your trust';
  }

}
