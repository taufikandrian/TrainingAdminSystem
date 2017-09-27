import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions } from '@angular/http';

import { JsonService } from './json.service';

import { User } from '../classes/user';
import { Environment } from '../classes/environment';

@Injectable()
export class UserService {
  private currentUser;
  private currentRolesUser;
  private currentRoleUser;

  constructor(private jsonService: JsonService,
              private http: Http,) {

    this.updateUser();
  }

  updateUser(): void{
    this.currentUser      = this.jsonService.checkJsonParse(localStorage.getItem('currentUser'));
    this.currentRolesUser = this.jsonService.checkJsonParse(localStorage.getItem('currentRolesUser'));
    this.currentRoleUser  = this.jsonService.checkJsonParse(localStorage.getItem('currentRoleUser'));
  }

  getUserID() : any {
    this.updateUser();
    return this.currentUser.id;
  }

  getCurrentUser() : any {
    this.updateUser();
    return this.currentUser;
  }

  getCurrentRolesUser() : any {
    this.updateUser();
    return this.currentRolesUser;
  }

  getCurrentRoleUser() : any {
    this.updateUser();
    return this.currentRoleUser;
  }

  // getAllUsers() : Observable<User[]> {
  //   return this.http.get(Environment.apiUrl+'/users/all')
  //   .map((response: Response) => {
  //     var responseData = response.json();

  //     if(responseData.confirmed === true) {
  //       let user = [{id: 'asdf', fullName: 'adsf', accountName: "asdf", email: "asdfa"}]
  //       return user;
  //     }
  //   });
  // }

  getDivisi(idJF): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/division/all/'+idJF)
    .map((response: Response) => {
      return response;
    });
  }

  getGrade(idJF): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/grade/all/'+idJF)
    .map((response: Response) => {
      return response;
    });
  }

  getJobFam(): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/jobfam/all')
    .map((response: Response) => {
      return response;
    });
  }

  getRole(): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/role/all')
    .map((response: Response) => {
      return response;
    });
  }

  delete(data): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/users/delete', data)
    .map((response: Response) => {
      return response;
    });
  }

  create(data): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/users/create', data)
    .map((response: Response) => {
      return response;
    });
  }

}
