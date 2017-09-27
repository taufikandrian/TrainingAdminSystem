import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;
import { slideInOutAnimation } from '../../../animations';

import { AuthenticationService } from '../../../services/authentication.service';
import { MenuService } from '../../../services/menu.service';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  animations: [slideInOutAnimation],
  styleUrls: ['./role.component.css'],
  // host: { '[@slideInOutAnimation]': '' }
})
export class RoleComponent implements OnInit {
  private currentUser;
  private currentRolesUser;
  private currentRoleUser;
  private isLoading = false;
  private choosenRoleText = '';
  private choosenRoleValue = '';

  constructor(
    private router: Router,
    private _authService: AuthenticationService,
    private _menuService: MenuService,
    private _userService: UserService,
    private _alertService: AlertService, ) {

    this.currentUser      = this._userService.getCurrentUser();
    this.currentRolesUser = this._userService.getCurrentRolesUser();
    this.currentRoleUser  = this._userService.getCurrentRoleUser();
    this._authService.check();

  }

  ngOnInit() {
    this._menuService.setCurrentRoute(this.router.url);
    this._authService.updateRole({userID: this._userService.getUserID()})
    .subscribe(result => {
      if (result.json().confirmed === true) {
        this.currentRolesUser = this._userService.getCurrentRolesUser();
        let dropdownValues = this.currentRolesUser;
        dropdownValues.map(function(item, key)  {
          item['name']   = item['roleName'];
          item['value']   = item['roleCode'];
        });

        let key = 0 ;
        dropdownValues.forEach(element => {
          if(this.currentRoleUser != null && this.currentRoleUser.roleCode == element['roleCode']) {
            this.choosenRoleText = this.currentRoleUser.roleName;
            element['selected'] = true;
          }
          else if(key == 0) {
            this.choosenRoleText = dropdownValues[0].roleName;
            element['selected'] = true;
          }
          key++;
        });

        $('.ui.roledropdown')
          .dropdown({
            values: dropdownValues,
            onChange: (value, text, $selected) => {
              this.choosenRoleText = text;
              this.choosenRoleValue = value;
            }
          })
        ;
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
          onApprove : ($element) => {
            this.logout();
          },
          onDeny: ($element) => {}
        });
      }
      this.isLoading = false;
    },
    err => {
      if(!err.ok) {
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
          message: 'Sorry, our server is offline',
          button : {
            size: '',
            position: 'center',
            fluid: true,
            fluidNumber: 'two',
            ok : {display: true,text: 'Ok',color: ''},
            deny : {display : false,text: 'Cancel',color: ''}
          },
          onApprove : ($element) => {
            this.logout();
          },
          onDeny: ($element) => {}
        });
        this.isLoading = false;
      }
    });
  }

  setRole(form: NgForm) {
    this.isLoading = true;
    if(this._authService.setRole(this.choosenRoleValue)){
      this.router.navigate(['/dashboard']);
    } else {
      swal({
          title: 'Opps!',
          text: "There is an error in our Application!",
          type: 'error',
          width: 300,
      });
      this.isLoading = false;
    }
  }

  logout(): void {
    if(this._authService.logout()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
