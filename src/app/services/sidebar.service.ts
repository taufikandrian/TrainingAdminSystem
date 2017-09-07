import { Injectable } from '@angular/core';
import { Router }            from '@angular/router';

import { allRoutes, trainerRoutes, managerRoutes, staffRoutes } from '../classes/route-info';

import { UserService } from './user.service';

declare var $:any;

@Injectable()
export class SidebarService {
  private sidebarSelector = '.ui.sidebar';
  public menuItems: any[];
  public currentUser;
  public currentRoleUser;

  private sidebarOptions  = {
    context: $('body'),
    transition: 'overlay',
  };

  constructor(
    private router: Router,
    private _userService: UserService) {}

  toogle(): void {
    $(this.sidebarSelector)
    .sidebar(this.sidebarOptions)
    .sidebar('toggle');
  }

  hide(): void {
    $(this.sidebarSelector)
    .sidebar(this.sidebarOptions)
    .sidebar('hide');
  }

  show(): void {
    $(this.sidebarSelector)
    .sidebar(this.sidebarOptions)
    .sidebar('show');
  }

  getActiveMenu(): any[] {
    this.currentUser      = this._userService.getCurrentUser();
    this.currentRoleUser  = this._userService.getCurrentRoleUser();

    if(this.currentRoleUser.roles_code == "ST")
      this.menuItems = staffRoutes.filter(menuItem => menuItem);
    else if(this.currentRoleUser.roles_code == "TR")
      this.menuItems = trainerRoutes.filter(menuItem => menuItem);
    else if(this.currentRoleUser.roles_code == "MG")
      this.menuItems = managerRoutes.filter(menuItem => menuItem);
    else if(this.currentRoleUser.roles_code == "AD")
      this.menuItems = allRoutes.filter(menuItem => menuItem);

    var path = this.router.url;
    for(var item = 0; item < this.menuItems.length; item++){

        if(path.match(this.menuItems[item].path)){
            this.menuItems[item].class = "active";
        } else {
            this.menuItems[item].class = "";
        }
    }
    return this.menuItems;
  }

}
