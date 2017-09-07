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
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  constructor(
    private router: Router,
    private _authenticationService: AuthenticationService,
    private _assetService: AssetService,
    private _menuService: MenuService,
    private _sidebarService: SidebarService,) {
      this._menuService.setCurrentRoute(this.router.url);
    }

  ngOnInit() {
    this._sidebarService.hide();
  }

}
