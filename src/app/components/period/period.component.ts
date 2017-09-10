import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../services/authentication.service';
import { AssetService } from '../../services/asset.service';
import { MenuService } from '../../services/menu.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {

  constructor(
    private router: Router,
    private _authService: AuthenticationService,
    private _assetService: AssetService,
    private _menuService: MenuService,
    private _sidebarService: SidebarService,) {
      this._authService.check();
      this._menuService.setCurrentRoute(this.router.url);
    }

  ngOnInit() {
    this._sidebarService.hide();
  }

}
