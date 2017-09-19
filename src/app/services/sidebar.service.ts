import { Injectable } from '@angular/core';
import { Router }            from '@angular/router';

import { allRoutes, trainerRoutes, managerRoutes, staffRoutes } from '../classes/route.info.repository';

import { UserService } from './user.service';

declare var $:any;

@Injectable()
export class SidebarService {
  public sidebarSelector = '.ui.sidebar';
  public menuItems: any[];
  public currentUser;
  public currentRoleUser;

  private sidebarOptions  = {
    context: $('body'),
    transition: 'overlay',
    silent: true,
    onHide: function() {
      // alert("beofre hide");
    },
    onHidden: function() {
      // alert("after hide");
    }
  };

  constructor(
    private router: Router,
    private _userService: UserService) {}

  getSidebar(): any {
    return $(this.sidebarSelector)
            .sidebar(this.sidebarOptions);
  }

  toogle(): void {
    if(!$(this.sidebarSelector).hasClass('animating')) {
      $(this.sidebarSelector)
        .sidebar(this.sidebarOptions)
        .sidebar('toggle');
    }
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
    $(this.sidebarSelector).sidebar(this.sidebarOptions);
    if(this.currentRoleUser.roleCode == "ST")
      this.menuItems = staffRoutes.filter(menuItem => menuItem);
    else if(this.currentRoleUser.roleCode == "TR")
      this.menuItems = trainerRoutes.filter(menuItem => menuItem);
    else if(this.currentRoleUser.roleCode == "MN")
      this.menuItems = managerRoutes.filter(menuItem => menuItem);
    else if(this.currentRoleUser.roleCode == "AD")
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
