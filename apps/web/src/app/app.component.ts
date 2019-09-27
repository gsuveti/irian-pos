import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '@irian-pos/api-interfaces';
import {PouchDBService} from './pouch-db.service';

@Component({
  selector: 'irian-pos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  hello$ = this.http.get<Message>('/api/hello');

  constructor(private http: HttpClient, private db: PouchDBService) {

  }

  ngOnInit(): void {
  }

}
