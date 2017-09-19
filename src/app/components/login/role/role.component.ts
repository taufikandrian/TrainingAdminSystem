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
  // host: { '[@slideInOutAnimation]': '' }
})
export class RoleComponent implements OnInit {
  private currentUser;
  private currentRolesUser;
  private currentRoleUser;
  private isLoading = true;
  private choosenRoleText = '';

  constructor(
    private router: Router,
    private _authService: AuthenticationService,
    private _menuService: MenuService,
    private _userService: UserService ) {

    this.currentUser      = this._userService.getCurrentUser();
    this.currentRolesUser = this._userService.getCurrentRolesUser();
    this.currentRoleUser  = this._userService.getCurrentRoleUser();

    this._authService.check();
    this._menuService.setCurrentRoute(this.router.url);
  }

  ngOnInit() {

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
            onChange: function(value, text, $selected) {
              $('select[name="choosenRole"]').attr('value', value);
            }
          })
        ;
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
        }).then( () => {
          if(this._authService.logout()) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/dashboard']);
          }
          // alert("oke");
          // swal(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
        }, function (dismiss) {
          // alert("dismiss");
          // if (dismiss === 'cancel') {
          //   swal(
          //     'Cancelled',
          //     'Your imaginary file is safe :)',
          //     'error'
          //   )
          // }
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

  logout(): void {
    if(this._authService.logout()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
