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
        if (response.json().status == 'success') {
          this.loggedUser = {
            username: response.json().user.username,
            email: response.json().user.email
          }
          localStorage.setItem('currentUser', JSON.stringify(this.loggedUser));
          return true;
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
