import {EventEmitter, Inject, Injectable, InjectionToken, NgZone} from '@angular/core';
// @ts-ignore
import PouchDB from 'pouchdb';
// @ts-ignore
import PouchFind from 'pouchdb-find';
import {Observable} from 'rxjs';

export const POUCHDB_SERVER_URL = new InjectionToken("POUCHDB_SERVER_URL");

@Injectable({
  providedIn: 'root'
})
export class PouchDBService {
  public listener: EventEmitter<any> = new EventEmitter();
  private isInstantiated: boolean;
  private productsDB: PouchDB.Database;
  private remoteProductsDB: PouchDB.Database;

  constructor(private zone: NgZone, @Inject(POUCHDB_SERVER_URL) private pouchDBServerURL: string) {

  }


  createDB(): PouchDB.Database {
    if (!this.isInstantiated) {
      PouchDB.plugin(PouchFind);

      this.productsDB = new PouchDB(`db`);
      this.remoteProductsDB = new PouchDB(this.pouchDBServerURL);

      this.productsDB.createIndex({
        index: {fields: ['state']}
      });

      this.productsDB.sync(this.remoteProductsDB, {
        live: true,
      }).on('change', (change) => {
        console.log("yay, we're in sync!");
        console.log(change);
        this.zone.run(() => {
          this.listener.emit();
        });
      }).on('error', (err) => {
        console.log("boo, we hit an error!");
        console.log(err);
      });

      this.isInstantiated = true;
    }
    return this.productsDB;
  }

  getProducts(): Observable<any> {
    console.log("find data in local store");
    console.time('find');

    return new Observable(observer => {
      this.productsDB.find({
          selector: {
            $and: [
              // {state: {$eq: 'California'}},
            ]
          }
        },
        (error, result) => {
          if (error) {
            observer.error(error)
          } else {
            console.log("data found!");
            console.timeEnd('find')
            observer.next(result.docs);
            observer.complete();
          }
        })
    });
  }

  saveProduct(product: any) {
    this.productsDB.post({...product, state: "California"});
  }


  removeProduct(id: string, rev: string) {
    this.productsDB.remove(id, rev);
  }


}
