import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '@irian-pos/api-interfaces';
import {PouchDBService} from '../pouch-db.service';
import {NgForm} from '@angular/forms';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'irian-pos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<Message>('/api/hello');
  products$;

  constructor(private http: HttpClient, private db: PouchDBService) {

  }

  ngOnInit(): void {
    this.products$ = this.db.listener.pipe(
      tap((data) => {
        console.log(data);
      }),
      switchMap((data) => {
        return this.db.getProducts();
      })
    );
  }

  saveProduct(form: NgForm) {
    this.db.saveProduct(form.value);
  }
}
