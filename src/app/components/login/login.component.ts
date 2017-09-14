import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../services/authentication.service';
import { AssetService } from '../../services/asset.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private assets = {};
  private isLoading = false;
  constructor(
    private router: Router,
    private _authService: AuthenticationService,
    private _assetService: AssetService,
    private _menuService: MenuService,) {
    this._authService.check();
    this._menuService.setCurrentRoute(this.router.url);

    this.assets['logo'] = this._assetService.getURL('_logo');

  }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.isLoading = true;
    this._authService.login(form.value.username, form.value.password)
    .subscribe(result => {
      if (result === true) {
          this.router.navigate(['/role']);
      } else {
        swal({
            title: 'Opps!',
            text: "Username or password is not match in our Database!",
            type: 'error',
            width: 300,
        });
      }
      this.isLoading = false;
    },
    err => {
      if(!err.ok) {
        swal({
          title: 'Opps!',
          text: "The server is down!",
          type: 'error',
          width: 300,
        });
        this.isLoading = false;
      }
    });
  }
}
