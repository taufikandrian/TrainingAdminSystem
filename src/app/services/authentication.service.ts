import { Injectable } from '@angular/core';
import { Router }            from '@angular/router';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UserService } from './user.service';
import { SidebarService } from './sidebar.service';
import { AlertService } from './alert.service';
import { Environment } from '../classes/environment';

@Injectable()
export class AuthenticationService {
  public currentUser;
  public currentRoleUser;

  constructor(
    private http:Http,
    private router: Router,
    private _sidebarService: SidebarService,
    private _alertService: AlertService,
    private _userService: UserService) {
    this.currentUser      = this._userService.getCurrentUser();
    this.currentRoleUser  = this._userService.getCurrentRoleUser();
  }

  check(): void {
    if(this._userService.getCurrentUser() && this._userService.getCurrentRoleUser()) {
      let passes = false;
      this._sidebarService.getActiveMenu().forEach(element => {
        if(this.router.url.match(element.path))
          passes = true;
      });
      if(this.router.url == '/role')
        passes = true;
      if(!passes) {
        // this._alertService.showError("oon");
        this.router.navigate(['/dashboard']);
      }

      if(this.router.url == '/login') {
        this.router.navigate(['/dashboard']);
      }
    } else {
      if(!this._userService.getCurrentUser()) {
        this.router.navigate(['/login']);
      }
      else if(this._userService.getCurrentUser() && !this._userService.getCurrentRoleUser()) {
        this.router.navigate(['/role']);
      }
    }
  }

  login(data): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/auth', data)
      .map((response: Response) => {
        var responseData = response.json();
        if (responseData.status == 'success') {
          localStorage.setItem('currentUser', JSON.stringify(responseData.data.user));
          localStorage.setItem('currentRolesUser', JSON.stringify(responseData.data.roles));
        }
        return response;
      });
  }

  updateRole(data): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/users/getRole', data)
      .map((response: Response) => {
        var responseData = response.json();
        if(responseData.confirmed === true) {
          localStorage.setItem('currentRolesUser', JSON.stringify(responseData.data.roles));
        }
        return response;
      });
  }

  setRole(role): boolean {
    if(role) {
      let userRoles = this._userService.getCurrentRolesUser();
      let userRole = userRoles.filter(function(roled){
        return roled.roleCode == role;
      });
      localStorage.setItem('currentRoleUser', JSON.stringify(userRole[0]));
      return true;
    } else {
      return false;
    }
  }

  logout(): boolean {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRolesUser');
    localStorage.removeItem('currentRoleUser');
    return true;
  }

  serverDown(): void {

  }
}
