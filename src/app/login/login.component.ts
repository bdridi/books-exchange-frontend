import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// Custom imports
import { AuthService } from '../auth.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  providers : [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

  public registred: '';
  public subscription: Subscription;

  public loginData = {
          username: '',
          password: ''
        };

  constructor(private _authservice: AuthService, private _route: ActivatedRoute) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    console.log('Component login initialized ! ');
    // this.loginData.username = '';
    // this.loginData.password = '';

    this.subscription = this._route
    .queryParams
    .subscribe(
      params => this.registred = params ['registred']
    );
  }

  login() {

    console.log('Form submitted ! ');
    console.log('login  :' + this.loginData.username);
    console.log('password  :' + this.loginData.password);
    this._authservice.saveUsername(this.loginData.username);
    this._authservice.obtainAccessToken(this.loginData);
  }

}
