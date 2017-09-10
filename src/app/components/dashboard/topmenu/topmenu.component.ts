import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../../services/authentication.service';
import { AssetService } from '../../../services/asset.service';
import { MenuService } from '../../../services/menu.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  private assets = {};
  private currentUser;
  private currentRoleUser;
  private isVisible = true;

  constructor(
    private router: Router,
    private _authService: AuthenticationService,
    private _menuService: MenuService,
    private _assetService: AssetService,
    private _userService: UserService) {
      this.assets['logo'] = this._assetService.getURL('_logo');
  }

  ngOnInit() {
    this._menuService.currentRoute$.subscribe(data => {
      this.currentUser      = this._userService.getCurrentUser();
      this.currentRoleUser  = this._userService.getCurrentRoleUser();
      if(this._menuService.hiddenSidebarForRoute.indexOf(data) >= 0) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    });
  }

  logout(): void {
    if(this._authService.logout()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
