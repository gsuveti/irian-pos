import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PouchDBService} from '../pouch-db.service';
import {FormControl} from '@angular/forms';
import {CouchbaseSessionService} from '../couchbase-session.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Keyboard from 'simple-keyboard';
import {NewBeerDialogComponent} from '../new-beer-dialog/new-beer-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'irian-pos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  products = [];
  beerCtrl = new FormControl();
  filteredBeers: Observable<any>;
  keyboard: Keyboard;
  showKeyboard: boolean;


  constructor(private db: PouchDBService,
              private router: Router,
              private sessionService: CouchbaseSessionService,
              public dialog: MatDialog) {

    this.filteredBeers = this.beerCtrl.valueChanges
      .pipe(
        startWith(''),
        map(beer => this._filterBeers(beer))
      );
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
      const value = this.beerCtrl.value;
      this.beerCtrl.setValue(value);
    });
  }


  removeProduct(_id: string, _rev: string) {
    this.db.removeProduct(_id, _rev);
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.beerCtrl.setValue(input);
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  logout() {
    this.sessionService.deleteUserSession().subscribe(
      () => {
        console.log("user was logged out!");
        this.router.navigate(["/login"]);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewBeerDialogComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  toggleKeyboard() {
    this.showKeyboard = !this.showKeyboard;
  }

  private _filterBeers(value: string): any[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.products.filter(product => {
        if (product.name) {
          return product.name.toLowerCase().indexOf(filterValue) === 0;
        }
        return false;
      });
    }
    return this.products.slice();
  }
}
