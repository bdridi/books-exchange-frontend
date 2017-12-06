import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { NgXCookies } from 'ngx-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Book } from './entities/book';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class GenericService {


  constructor(private _http: Http, private _authService: AuthService) {

  }


  /* Generic findAll
  * @param resourceUrl : resource name
  * @param isSecured : true if the resource needs authentication
  */
  public findAll(resource, isSecured, page): Observable<any> {
    console.log('GenericService.findAll');
    console.log( environment.apiEndpoint + resource);
    const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    if (isSecured) {
      // Add acces token to the hpageeader if the resource isSecured
      headers.append ('Authorization', 'Bearer ' +  this._authService.getAccesToken());
    }
    let url = environment.apiEndpoint + resource;
    if ( page > 0 ) {
      url += '?page=' + page;
    }
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url, options)
                   .map((res: Response) => res.json())
                   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /*
  * find resource by ID
  */

  public findById(resource, id, isSecured) {
    console.log('GenericService.findById');
    console.log( environment.apiEndpoint + resource + '/' + id);
    // # Header with acces token
    const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    if (isSecured) {
          headers.append ('Authorization', 'Bearer ' + this._authService.getAccesToken());
    }
    const options = new RequestOptions({ headers: headers });
    return this._http.get(environment.apiEndpoint + resource + '/' + id, options)
                   .map((res: Response) => res.json())
                   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /*
  * Save resource method : POST OR PUT
  */

  public saveResource(resource, obj, isSecured, contentType) {
    console.log('GenericService.saveResource');
    console.log('POST OR PUT : ' + environment.apiEndpoint + resource);
    // # Header with acces token

    const headers = new Headers({'Content-type': contentType});
    // if the request is secured, send the access_token
    if (isSecured) {
          headers.append ('Authorization', 'Bearer ' + this._authService.getAccesToken());
    }
    let urlSearchParams = new URLSearchParams();
    if ( contentType !== 'application/json; charset=utf-8') {
      urlSearchParams = this.appendParams(urlSearchParams, obj);
    }
    const options = new RequestOptions({ headers: headers });
    let response;
    // Check if POST or PUT request
    if (obj.id != null) {
      response = this._http.put(environment.apiEndpoint + resource, urlSearchParams.toString(), options);
    } else {
      response = this._http.post(environment.apiEndpoint + resource, urlSearchParams.toString(), options);
    }

    return response
                   .map((res: Response) => res.json())
                   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /*
  * Delete resource
  */

  public deleteResource(resource, id, isSecured) {
    console.log('GenericService.deleteResource');
    console.log( environment.apiEndpoint + resource + '/' + id);
    // # Header with acces token
    const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    if (isSecured) {
          headers.append ('Authorization', 'Bearer ' + this._authService.getAccesToken());
    }
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(environment.apiEndpoint + resource + '/' + id, options)
                   .map((res: Response) => res.json())
                   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // append object attribute to the urlsearch parameter
  appendParams(params: URLSearchParams, obj: any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log('appending ....');
        params.append(key, obj[key]);
      }
    }
    console.log(params);
    return params;
  }


  // filling  pages informations from api response
  setPagesInformations(response: any ) {
    const pagesInfos: any = {};

    pagesInfos.last = response.last;
    pagesInfos.totalPages = response.totalPages;
    pagesInfos.totalElements = response.totalElements;
    pagesInfos.sort = response.sort;
    pagesInfos.numberOfElements = response.numberOfElements;
    pagesInfos.first = response.first;
    pagesInfos.number = response.number;

    return pagesInfos;
  }

  getResourceWithPassingParameter(resource, object, isSecured, contentType) {

        console.log('GenericService.getResourceWithPassingParameter ');
        const params = new URLSearchParams();
        const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
        if (isSecured) {
              headers.append ('Authorization', 'Bearer ' + this._authService.getAccesToken());
        }
        let urlSearchParams = new URLSearchParams();
        if ( contentType !== 'application/json; charset=utf-8') {
          urlSearchParams = this.appendParams(urlSearchParams, object);
        }
        console.log('urlSearchParams : ' + urlSearchParams.toString());
        const options = new RequestOptions({ search: urlSearchParams.toString(), headers: headers });
        return this._http.get(environment.apiEndpoint + resource, options)

        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

}
