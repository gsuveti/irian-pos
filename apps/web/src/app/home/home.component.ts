import {Component, OnInit} from '@angular/core';
import {PouchDBService} from '../pouch-db.service';
import {NgForm} from '@angular/forms';
import {CouchbaseSessionService} from '../couchbase-session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'irian-pos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products;

  constructor(private db: PouchDBService, private router: Router, private sessionService: CouchbaseSessionService) {

  }

  ngOnInit(): void {
    this.db.createDB();
    this.getProducts();
    this.db.listener.subscribe((change) => {
      this.getProducts();
    });
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

  logout() {
    this.sessionService.deleteUserSession().subscribe(
      () => {
        console.log("user was logged out!");
        this.router.navigate(["/login"]);
      }
    );
  }
}
