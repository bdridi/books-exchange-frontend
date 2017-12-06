import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './book.service';
import { GenericService } from './generic.service';
import { OffersComponent } from './offers/offers.component';
import { ExchangeSuggestionComponent } from './exchange-suggestion/exchange-suggestion.component';
import { AuthService } from './auth.service';
import { OfferService } from './offer.service';
import { RequestService } from './request.service';
import { RequestAbookComponent } from './request-abook/request-abook.component';
import { SendedRequeststsComponent } from './sended-requeststs/sended-requeststs.component';
import { RecievedRequeststsComponent } from './recieved-requeststs/recieved-requeststs.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { UserExchangesComponent } from './user-exchanges/user-exchanges.component';
import { BookDetailsComponent } from './book-details/book-details.component';



const appRoutes: Routes = [
{  path : 'home' , component : HomeComponent},
{  path : 'contact' , component : ContactComponent},
{  path : 'about' , component : AboutComponent},
{  path : 'login' , component : LoginComponent},
{  path : 'register' , component : RegisterComponent},
{  path : 'books' , component : BooksComponent},
{  path : 'offers' , component : OffersComponent},
{  path : 'suggest' , component : ExchangeSuggestionComponent},
{  path : 'sendedRequests' , component : SendedRequeststsComponent},
{  path : 'recievedRequests' , component : RecievedRequeststsComponent},
{  path : 'userBooks' , component : UserBooksComponent},
{  path : 'userExchanges' , component : UserExchangesComponent},
{  path : 'request' , component : RequestAbookComponent},
{  path : 'bookDetails' , component : BookDetailsComponent},
{  path : '', redirectTo : '/home', pathMatch : 'full'}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    BooksComponent,
    OffersComponent,
    ExchangeSuggestionComponent,
    RequestAbookComponent,
    SendedRequeststsComponent,
    RecievedRequeststsComponent,
    UserBooksComponent,
    UserExchangesComponent,
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [BookService, GenericService, AuthService, OfferService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
