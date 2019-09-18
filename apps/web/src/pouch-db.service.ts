import {EventEmitter, Injectable} from '@angular/core';
// @ts-ignore
import PouchDB, {Database} from 'pouchdb';
// @ts-ignore
import PouchFind from 'pouchdb-find';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PouchDBService {
  public listener: EventEmitter<any> = new EventEmitter();
  private readonly isInstantiated: boolean;
  private productsDB: PouchDB.Database;
  private remoteProductsDB: PouchDB.Database;

  constructor() {
    if (!this.isInstantiated) {
      PouchDB.plugin(PouchFind);

      this.productsDB = new PouchDB("products");
      this.remoteProductsDB = new PouchDB("http://localhost:5984/products");

      this.productsDB.sync(this.remoteProductsDB, {
        live: true
      }).on('change', function (change) {
        // yay, we're in sync!
        console.log(change);
      }).on('error', function (err) {
        // boo, we hit an error!
        console.log(err);
      });

      this.productsDB.createIndex({
        index: {fields: ['collection', 'name']}
      });
      this.productsDB.changes({
        live: true,
        include_docs: true
      }).on('change', change => {
        this.listener.emit(change);
      });
      this.isInstantiated = true;
    }
  }

  getProducts(): Observable<any> {
    return new Observable(observer => {
      this.productsDB.find({
          selector: {
            $and: [
              {name: {$gt: true}},
              {collection: {$eq: 'products'}},
            ]
          },
          sort: ['name']
        },
        (error, result) => {
          if (error) {
            observer.error(error)
          } else {
            observer.next(result.docs);
            observer.complete();
          }
        })
    });

  }

  saveProduct(product: any) {
    this.productsDB.post({...product, collection: "products"});
  }
}
