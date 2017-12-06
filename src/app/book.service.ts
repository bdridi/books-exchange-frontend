import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { NgXCookies } from 'ngx-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Book } from './entities/book';
import { environment } from '../environments/environment';

@Injectable()
export class BookService {

  private findBooksByNameResource: String = 'public/findBooks';
  constructor(private _http: Http) {}

  /* findBook by its name
  *  @Param name : name of the book
  */
  findBooksByName(name) {

    console.log('findBooksByName : ' + name);
    const params = new URLSearchParams();
    params.append('name', name);

    const headers = new Headers(
      {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    const options = new RequestOptions({ search: params });

    return this._http.get(environment.apiEndpoint + this.findBooksByNameResource + '?name='  + name, options)

    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


}
