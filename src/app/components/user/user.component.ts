import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../services/authentication.service';
import { AssetService } from '../../services/asset.service';
import { MenuService } from '../../services/menu.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private activeRoute = '/users';
  constructor(
    private router: Router,
    private _authService: AuthenticationService,
    private _assetService: AssetService,
    private _menuService: MenuService,
    private _sidebarService: SidebarService,) {
      this.activeRoute = this.router.url
      this._authService.check();
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationStart) {
        this.activeRoute = val.url;
      }
    })
    this._menuService.setCurrentRoute(this.router.url);
  }

  isActiveRoute(routeURL) {
    return routeURL == this.activeRoute;
  }

}
