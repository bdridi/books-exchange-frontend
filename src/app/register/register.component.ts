import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../entities/user';
import { AuthService } from '../auth.service';
import { GenericService } from '../generic.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  public user: User;
  private registerUrl = 'users';
  public errorMessage: string;
  public succesMessage: string;
  public pwd: string;

  constructor(private _router: Router, private _genericService: GenericService) {
    this.user = new User();
  }

  ngOnInit() {this.user = new User();

  }

  register(isValid: boolean): void {

    if (isValid) {
      console.log(' Form is valid ! Cool :)');
      if (this.user.password !== this.pwd) {
        this.errorMessage = ' Passwords don\'t match ';
      } else {

      this._genericService.saveResource(this.registerUrl, this.user, false, environment.contentTypes.json)
      .subscribe(
        data => this.succes(data),
        error => this.errorMessage = <any>error
       );
      }
    }

  }

  succes(data): void {
    this.user = data;
    this.succesMessage = 'Congratulation ' +  this.user.name + '! You\'ve signed up now, Please login in your account';
    this._router.navigate(['/login'], { queryParams: { registred : this.user.name}});
  }

}
