import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../services/authentication.service';
import { AssetService } from '../../services/asset.service';
import { MenuService } from '../../services/menu.service';
import { UserService } from '../../services/user.service';

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
    private _userService: UserService,
    private _menuService: MenuService,) {
    this._authService.check();
    this.assets['logo'] = this._assetService.getURL('_logo');

  }

  ngOnInit() {
    this._menuService.setCurrentRoute(this.router.url);
    $('.ui.form.login')
      .form({
        fields: {
          username: {
            identifier: 'username',
            rules: [{
              type : 'empty',
              prompt : 'Please enter your login name'
            }]
          },
          password: {
            identifier: 'password',
            rules: [{
              type : 'empty',
              prompt : 'Please enter your password'
            }]
          }
        }, onSuccess: (event, fields) => {
          event.preventDefault();
          this.login(fields);
        }, inline: true, on : 'blur'
    });
  }

  login(fields) {
    this.isLoading = true;
    this._authService.login(fields)
    .subscribe(result => {
      if (result.json().confirmed === true) {
          this.router.navigate(['/role']);
      } else {
        swal({
            title: 'Opps!',
            html: '<h2 class="ui header">\
                    <div class="sub header">'+ result.json().message +'</div>\
                  </h2>',
            type: 'error',
            width: 300,
            buttonsStyling: false,
            confirmButtonText: 'Oke!',
            confirmButtonClass: 'ui button',
            // title: 'Opps!',
            // text: result.json().message,
            // type: 'error',
            // width: 300,
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
