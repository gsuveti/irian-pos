import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {CouchbaseSessionService} from './couchbase-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private sessionService: CouchbaseSessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sessionService.createUserSession().pipe(
      map(res => {
        console.log(res);
        return true;
      }),
      catchError((err) => {
        console.log(err);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
