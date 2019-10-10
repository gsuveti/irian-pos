import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {POUCHDB_SERVER_URL} from './pouch-db.service';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from './auth-guard.service';
import {CookieService} from 'ngx-cookie-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NewBeerDialogComponent} from './new-beer-dialog/new-beer-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxElectronModule} from 'ngx-electron';
import {OrdersComponent} from './orders/orders.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NewBeerDialogComponent, OrdersComponent],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: "", component: HomeComponent, canActivate: [AuthGuardService]},
      {path: "login", component: LoginComponent},
      {path: "orders", component: OrdersComponent}
    ]),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule, MatIconModule, MatButtonModule, MatDialogModule,
    NgxElectronModule
  ],
  providers: [
    CookieService,
    {
      provide: POUCHDB_SERVER_URL,
      useValue: "http://localhost:4984/db"
      // useValue: "http://localhost:5984/db"
    }
  ],
  entryComponents: [
    NewBeerDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
