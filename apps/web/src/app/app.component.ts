import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '@irian-pos/api-interfaces';
import {PouchDBService} from '../pouch-db.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'irian-pos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<Message>('/api/hello');
  products;

  constructor(private http: HttpClient, private db: PouchDBService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.db.listener.subscribe((change) => {
      this.getProducts();
    })
  }

  getProducts() {
    this.db.getProducts().subscribe((data) => {
      this.products = [...data];
    });
  }

  saveProduct(form: NgForm) {
    this.db.saveProduct(form.value);
  }

  removeProduct(_id: string, _rev: string) {
    this.db.removeProduct(_id, _rev);
  }
}
