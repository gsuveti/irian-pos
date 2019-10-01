import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PouchDBService} from '../pouch-db.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'irian-pos-new-beer-dialog',
  templateUrl: './new-beer-dialog.component.html',
  styleUrls: ['./new-beer-dialog.component.scss']
})
export class NewBeerDialogComponent implements OnInit {

  constructor(private db: PouchDBService, public dialogRef: MatDialogRef<NewBeerDialogComponent>) {
  }

  ngOnInit() {
    this.db.createDB();
  }

  saveProduct(form: NgForm) {
    this.db.saveProduct(form.value);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
