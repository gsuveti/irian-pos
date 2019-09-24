import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {POUCHDB_SERVER_URL} from '../pouch-db.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [
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
