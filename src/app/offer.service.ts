import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OfferService {

  private resource = 'saveOffer';
  constructor( private _http: Http, private _authService: AuthService) { }


  save(offerObj) {

    console.log('OfferService.save');
    // # Header with acces token
    const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    headers.append ('Authorization', 'Bearer ' + this._authService.getAccesToken());
    const params = new URLSearchParams();
    params.append('book', offerObj.book);
    params.append('preference', offerObj.preference);
    const options = new RequestOptions({ headers: headers });
    let response;
    response = this._http.post(environment.apiEndpoint + this.resource, params.toString(), options);
    return response
                   .map((res: Response) => res.json())
                   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
