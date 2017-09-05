import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
  public loggedUser = {};

  constructor(private http:Http) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:3000/api/auth', { username: username, password: password })
      .map((response: Response) => {
        var responseData = response.json();
        // console.log(response.json().data.user);
        // return false;
        console.log(responseData.status);
        if (responseData.status == 'success') {
          this.loggedUser = responseData.data.user;
          localStorage.setItem('currentUser', JSON.stringify(this.loggedUser));
          // console.log(localStorage.getItem('currentUser'));
          return false;
        } else {
          return false;
        }
      });
  }

  logout(): boolean {
    localStorage.removeItem('currentUser');
    return true;
  }
}
