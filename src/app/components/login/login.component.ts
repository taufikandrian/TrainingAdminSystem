import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../services/authentication.service';
import { AssetService } from '../../services/asset.service';
import { MenuService } from '../../services/menu.service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

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
    private _alertService: AlertService,
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
        this._alertService.setAlert({
          closable: true,
          header : {
            // pot lan
            type: 'lan',
            color: 'red',
            icon: 'warning sign',
            text: 'Opps!',
            subheader: 'Sorry, something get an error'
          },
          message: result.json().message,
          button : {
            size: '',
            position: 'center',
            fluid: true,
            fluidNumber: 'two',
            ok : {display: true,text: 'Ok',color: ''},
            deny : {display : false,text: 'Cancel',color: ''}
          },
          onApprove : ($element) => {},
          onDeny: ($element) => {}

        });
      }
      this.isLoading = false;
    },
    err => {
      if(!err.ok) {
        this._alertService.setAlert({
          closable: false,
          header : {
            // pot lan
            type: 'pot',
            color: 'red',
            icon: 'heartbeat',
            text: 'Opps!',
            subheader: 'Sorry, something get an error'
          },
          message: "Error in our Back-End",
          button : {
            size: 'small',
            position: 'center',
            fluid: true,
            fluidNumber: 'two',
            ok : {display: true,text: 'Ok',color: ''},
            deny : {display : false,text: 'Cancel',color: ''}
          },
          onApprove : ($element) => {},
          onDeny: ($element) => {}
        });
        this.isLoading = false;
      }
    });
  }
}
