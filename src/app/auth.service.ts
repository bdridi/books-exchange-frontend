import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { NgXCookies } from 'ngx-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AuthService {


    constructor(
      private _router: Router, private _http: Http) {}

      // get a new acces token, providing user credentials from login form
      obtainAccessToken(loginData) {
        console.log('Service AuthService :  Method otainAccessToken ! ');
        console.log('login  :' + loginData.username);
        console.log('password  :' + loginData.password);

        const params = new URLSearchParams();
        params.append('username', loginData.username);
        params.append('password', loginData.password);
        params.append('grant_type', 'password');
        // params.append('client_id','api');
        const headers = new Headers(
          {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
           'Authorization': 'Basic ' + btoa('api:secret')});
        const options = new RequestOptions({ headers: headers });

        this._http.post(environment.authorizationServerUrl, params.toString(), options)
          .map(res => res.json())
          .subscribe(
            data => this.saveToken(data),
            err => this.loginError());
      }

      loginError() {
        alert('Invalid Credentials');
        this.resetUser();
      }

      saveToken(token) {
        const expireDate = new Date().getTime() + (1000 * token.expires_in);
        // NgXCookies.setCookie("refresh_token", token.access_token, expireDate);
        NgXCookies.setCookie('access_token', token.access_token, expireDate);

        this._router.navigate(['/']);
      }

      // check if the user is logged, otherwise redirect to login page
      checkCredentials() {
        if (!NgXCookies.exists('access_token')) {
            this._router.navigate(['/login']);
        }
      }

      // Logout
      logout() {
        NgXCookies.deleteCookie('access_token');
        this.resetUser();
        this._router.navigate(['/home']);
      }

      // return the acces token
      getAccesToken() {
        return NgXCookies.getCookie('access_token');
      }

      // return true if user is logged in
      isLoggedIn() {
        console.log('isLoggedIn is called');
        if (!NgXCookies.exists('access_token')) {
           return false;
        }
        return true;
      }

      // save authenticated user username
      saveUsername(username) {
        NgXCookies.setCookie('username', username, 1000);
      }

      getAuthenticatedUser() {
        return NgXCookies.getCookie('username');
      }

      resetUser() {
        NgXCookies.deleteCookie('username');
      }

}
