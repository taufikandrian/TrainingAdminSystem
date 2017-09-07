import { Injectable } from '@angular/core';

import { JsonService } from './json.service';

@Injectable()
export class UserService {
  private currentUser;
  private currentRoleUser;

  constructor(private jsonService: JsonService) {
    this.updateUser();
  }

  updateUser(): void{
    this.currentUser      = this.jsonService.checkJsonParse(localStorage.getItem('currentUser'));
    this.currentRoleUser  = this.jsonService.checkJsonParse(localStorage.getItem('currentRoleUser'));
  }

  getCurrentUser() : any {
    this.updateUser();
    return this.currentUser;
  }

  getCurrentRoleUser() : any {
    this.updateUser();
    return this.currentRoleUser;
  }

}
