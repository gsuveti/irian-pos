import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {POUCHDB_SERVER_URL} from './pouch-db.service';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from './auth-guard.service';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule,
    RouterModule.forRoot([
      {path: "", component: HomeComponent, canActivate: [AuthGuardService]},
      {path: "login", component: LoginComponent}
    ])],
  providers: [
    CookieService,
    {
      provide: POUCHDB_SERVER_URL,
      useValue: "http://localhost:4984/db"
      // useValue: "http://localhost:5984/db"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
