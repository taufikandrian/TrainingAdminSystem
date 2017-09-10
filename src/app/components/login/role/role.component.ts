import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;
import { slideInOutAnimation } from '../../../animations';

import { AuthenticationService } from '../../../services/authentication.service';
import { MenuService } from '../../../services/menu.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  animations: [slideInOutAnimation],
  styleUrls: ['./role.component.css'],
  host: { '[@slideInOutAnimation]': '' }
})
export class RoleComponent implements OnInit, AfterViewChecked {
  private currentUser;
  private currentRoleUser;
  private isLoading = false;
  private choosenRoleText = '';

  constructor(
    private router: Router,
    private _authService: AuthenticationService,
    private _menuService: MenuService,
    private _userService: UserService ) {

    this.currentUser      = this._userService.getCurrentUser();
    this.currentRoleUser  = this._userService.getCurrentRoleUser();

    this._menuService.setCurrentRoute(this.router.url);
  }

  ngOnInit() {

    let dropdownValues = this.currentUser.roles;

    dropdownValues.map(function(item, key)  {
      item['name']   = item['roles_name'];
      item['value']   = item['roles_code'];
    });

    let key = 0 ;
    dropdownValues.forEach(element => {
      if(this.currentRoleUser != null && this.currentRoleUser.roles_code == element['roles_code']) {
        this.choosenRoleText = this.currentRoleUser.roles_name;
        element['selected'] = true;
      }
      else if(key == 0) {
        this.choosenRoleText = dropdownValues[0].roles_name;
        element['selected'] = true;
      }
      key++;
    });

    $('.ui.roledropdown')
      .dropdown({
        values: dropdownValues,
        onChange: function(value, text, $selected) {
          $('select[name="choosenRole"]').attr('value', value);
        }
      })
    ;
  }

  ngAfterViewChecked() {
    this.isLoading = false;
  }

  dropdownChange() {
    this.choosenRoleText = $('.ui.roledropdown').dropdown('get text');
  }

  setRole(form: NgForm) {
    this.isLoading = true;
    if(this._authService.setRole($('select[name="choosenRole"]').attr('value'))){
      this.router.navigate(['/dashboard']);
    } else {
      this.isLoading = false;
      swal({
          title: 'Opps!',
          text: "There is an error in our Application!",
          type: 'error',
          width: 300,
      });
    }
  }

}
