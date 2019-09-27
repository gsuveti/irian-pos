import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {CouchbaseSessionService} from '../couchbase-session.service';

@Component({
  selector: 'irian-pos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private sessionService: CouchbaseSessionService) {
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
    const {name, password} = form.value;

    this.sessionService.createUserSession(name, password)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(["/"])
        },
        () => {
        },
      );
  }
}
