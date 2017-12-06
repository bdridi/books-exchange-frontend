import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../entities/book';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {

  allBooks:  Book[];
  public singleBook: Book;
  errorMessage: String;
  public pageInformations: any;
  public pagesArray: any;

  constructor(private _genericService: GenericService) { }

  ngOnInit() {
    console.log('Init BooksComponenet');
    this.fetchBooks(0);
  }

  fetchBooks(page: number): void {

    console.log('fetchBooks function call : page = ' + page );
    this._genericService.findAll('books', false, page)
    .subscribe(
      data => this.then(data),
      error => this.errorMessage = <any>error
    );
  }

  then(response) {

    this.allBooks = response._embedded.books;
    this.pageInformations = response.page;
    this.pagesArray = new Array(this.pageInformations.totalPages);
    for ( let i = 0 ; i < this.pageInformations.totalPages; i ++ ) {
        this.pagesArray[i] = i;
    }
  }

}
