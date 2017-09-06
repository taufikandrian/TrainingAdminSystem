import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
  public loggedUser;

  constructor(private http:Http) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:3000/api/auth', { username: username, password: password })
      .map((response: Response) => {
        var responseData = response.json();
        if (responseData.status == 'success') {
          this.loggedUser = responseData.data.user;
          localStorage.setItem('currentUser', JSON.stringify(this.loggedUser));
          return true;
        } else {
          return false;
        }
      });
  }

  setRole(role): boolean {
    if(role) {
      let userRoles = JSON.parse(localStorage.getItem('currentUser')).roles;
      let userRole = userRoles.filter(function(roled){
        return roled.roles_code == role;
      });

      localStorage.setItem('currentRoleUser', JSON.stringify(userRole));
      return true;
    } else {
      return false;
    }
  }

  logout(): boolean {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRoleUser');
    return true;
  }
}
