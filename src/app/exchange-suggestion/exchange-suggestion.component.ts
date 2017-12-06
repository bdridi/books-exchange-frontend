import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Book } from '../entities/book';
import { BookService } from '../book.service';
import { AuthService } from '../auth.service';
import { GenericService } from '../generic.service';
import { OfferService } from '../offer.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-exchange-suggestion',
  templateUrl: './exchange-suggestion.component.html',
  styleUrls: ['./exchange-suggestion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExchangeSuggestionComponent implements OnInit, OnDestroy {

  public books: Book[];
  public book: Book;
  public query: string;
  public errorMessage: string;
  public successMessage: string;
  private isNewBook = true;
  public preference: string;
  public createdOffer: any;

  public suggestion = {
    book : '',
    preference: ''
  };

  constructor(private _authService: AuthService,
    private _genericService: GenericService, private _offerService: OfferService) { }

  ngOnInit() {
    // To be enabled later
    this._authService.checkCredentials();
    this.book = new Book();
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnDestroy() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  public select(selected) {

    console.log('selected book is :' + selected.id);
    this.book = selected;
    this.books = [];
    this.isNewBook = false;
  }

  // Search book by title : if book exists select it.
  public search() {
    console.log('search is fired..');
    console.log(' search term : ' + this.book.title);
    const param = {
      name: this.book.title
    };

    this._genericService.getResourceWithPassingParameter
    (environment.findBookByNameUrl, param, false, environment.contentTypes.XwwwFormUrlencoded)
    .subscribe(
      data => this.books = data,
      error => this.errorMessage = <any>error
    );
  }

  public save(isValid) {

    // save the book if does not exists in the database
    if ( isValid) {
      if (this.isNewBook) {
        console.log(' creating a new book');
        this._genericService.saveResource('books', this.book, false, environment.contentTypes.json)
        .subscribe(
          data => this.saveOffer(data),
          error => this.errorMessage = <any>error
        );
      }else {
          this.saveOffer(this.book);
      }
    }
  }

  // save the exchange offer ( suggestion)
  public saveOffer(bookToSave) {
    this.book = bookToSave;
    this.suggestion.book = '' + this.book.id + '';
    this.suggestion.preference = this.preference;
    console.log('save the exchange suggestion');
    this._offerService.save(this.suggestion)
    .subscribe(
      data => this.createdOffer = data,
      error => this.errorMessage = <any>error
    );
    // reset book
    this.book = new Book();
    this.preference = '';
    this.isNewBook = true;
    this.successMessage = 'Your exchange wish has been added ! Wait for it ...';
  }
}
