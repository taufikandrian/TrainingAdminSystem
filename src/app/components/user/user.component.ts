import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd }            from '@angular/router';
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
      this._authService.check();
      this._menuService.setCurrentRoute(this.router.url);

      router.events.subscribe((val) => {
        if(val instanceof NavigationEnd)
          this.activeRoute = val.url;
      })
  }

  isActiveRoute(routeURL) {
    return routeURL == this.activeRoute;
  }
  
  ngOnInit() {
    this._sidebarService.hide();
  }

}
