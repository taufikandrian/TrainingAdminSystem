import { Injectable } from '@angular/core';

import { JsonService } from './json.service';

@Injectable()
export class UserService {
  private currentUser;
  private currentRolesUser;
  private currentRoleUser;

  constructor(private jsonService: JsonService) {

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

  // getAllUsers() : User[] {

  // }

}
