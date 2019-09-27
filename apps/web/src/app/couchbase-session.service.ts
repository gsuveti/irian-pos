import {Inject, Injectable} from '@angular/core';
import {POUCHDB_SERVER_URL} from './pouch-db.service';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CouchbaseSessionService {

  constructor(private http: HttpClient, @Inject(POUCHDB_SERVER_URL) private pouchDBServerURL: string, private cookieService: CookieService) {
  }

  createUserSession(name?: string, password?: string) {
    return this.http.post(`${this.pouchDBServerURL}/_session`, {
      name,
      password
    }, {
      headers: {
        'Content-Type': "application/json",
        "Accept": "*/*"
      },
      withCredentials: true,
    });
  }

  deleteUserSession() {
    return this.http.delete(`${this.pouchDBServerURL}/_session`, {withCredentials: true});
  }
}
