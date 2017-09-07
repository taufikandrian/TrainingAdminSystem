import { Injectable } from '@angular/core';
import { Router }            from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
  public currentUser;
  public currentRoleUser;

  constructor(
    private http:Http,
    private router: Router,
    private _userService: UserService) {
    this.currentUser      = this._userService.getCurrentUser();
    this.currentRoleUser  = this._userService.getCurrentRoleUser();

    this.check();
  }

  check(): void {
    if(this.currentUser && this.currentRoleUser) {
      this.router.navigate(['/dashboard']);
    } else {
      if(!this.currentUser)
        this.router.navigate(['/login']);
      else if(this.currentUser && !this.currentRoleUser)
        this.router.navigate(['/role']);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:3000/api/auth', { username: username, password: password })
      .map((response: Response) => {
        var responseData = response.json();
        if (responseData.status == 'success') {
          localStorage.setItem('currentUser', JSON.stringify(responseData.data.user));
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

      localStorage.setItem('currentRoleUser', JSON.stringify(userRole[0]));
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
