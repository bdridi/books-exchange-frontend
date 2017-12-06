import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericService } from '../generic.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  public book: any;
  public errorMessage: '';
  private subscription: Subscription;

  constructor(private _genericService: GenericService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this._route
    .queryParams
    .subscribe(
      params => this.then( params)
    );


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }


  then(params) {
    this._genericService.findById(environment.booksResourceUrl, params['id'], false)
    .subscribe(
      data => this.book = data,
      error => this.errorMessage = <any>error
     );
  }

}
