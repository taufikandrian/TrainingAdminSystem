import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute }            from '@angular/router';

import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { MessageService } from '../../../services/message.service';
import { MenuService } from '../../../services/menu.service';
import { User } from '../../../classes/user';

declare var $:any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  private roledropdown: any[];
  private isLoading = true;
  private curUser: User;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private _userService: UserService,
              private _messageService: MessageService,
              private _menuService: MenuService,
              private _alertService: AlertService,) { }

  ngOnInit() : void {
    this._menuService.setCurrentHeader({
      icon  : 'user',
      main  : 'User Edit',
      sub   : 'Edit existing user',
      size  : 'large',
      visible: true,
    });
    this._menuService.setCurrentRoute(this.router.url);
    this.route.params.subscribe(params => {
      this._userService.detail(params['id']).subscribe(response => {
        let user : User;
        user = response.json().data.Get_User;
        this.curUser = user;
        this.initDropdown();
        this.initForm()
        this.isLoading = false
      })
    })
  }

  initDropdown(): void {

    //STATUS
    $('.ui.statusdropdown')
    .dropdown('set selected', this.curUser.status);

    //ROLE
    //GET ALL ROLES
    this._userService.getRole()
    .subscribe(result => {
      if (result.json().confirmed === true) {
        let dropdownValues = result.json().data.Get_Role;
        var curUserRoles = [];

        // SET CURRENT ROLE
        let roles = this.curUser.roleList;
        if (roles.length > 0) {
          roles.forEach(role => {
            curUserRoles.push(role.roleCode);
          })
        }

        dropdownValues.map((item, key)  => {
          item['name']   = item['roleName'];
          item['value']   = item['roleCode'].trim();
          if(curUserRoles.indexOf(item['roleCode']) > -1) item['selected'] = true;
        });
        this.roledropdown = dropdownValues;
        $('.ui.roledropdown')
        .dropdown({
          onChange: (value, text, $selected) => {}
        });

      } else {
        this._alertService.buildAlertError(result.json().message);
      }
      this.isLoading = false;
    },
    err => {
      if(!err.ok) {
        this._alertService.buildAlertError('Sorry, our server is offline');
        this.isLoading = false;
      }
    });
  }

  initForm() {
    $('.ui.form.usercreate')
    .form({
      fields: {
        roles: {
          identifier: 'roles',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        status: {
          identifier: 'status',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        }
      }, onSuccess: (event, fields) => {
        this.isLoading = true;
        event.preventDefault();
        this._userService.update(fields, this.curUser.accountName).subscribe(response => {
          if (response.json().confirmed === true) {

            let usrObj: User;
            usrObj = response.json().data.Update_User;
            this.curUser = usrObj
            this._messageService.setMessage({
              icon: 'checkmark',
              headerMain: 'Successfully',
              headerSub: usrObj.fullName + ' successfully updated',
              type: 'top tiny positive text container'
            })
            this.isLoading = false
          } else {
            this._alertService.buildAlertError(response.json().message);
          }
        })
      }, inline: true, on : 'blur'
    });
  }

}
