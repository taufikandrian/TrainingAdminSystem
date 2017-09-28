import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd }            from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { MenuService } from '../../../services/menu.service';

declare var $:any;
declare var swal: any;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  private isLoading = true;
  private jobfamdropdown: any[];
  private gradedropdown: any[];
  private divisiondropdown: any[];
  private roledropdown: any[];
  constructor(private _userService: UserService,
              private router: Router,
              private _menuService: MenuService,
              private _alertService: AlertService,) { }

  ngOnInit() {

    this._menuService.setCurrentHeader({
      icon  : 'users',
      main  : 'User Create',
      sub   : 'Create new user',
      size  : 'large',
      visible: true,
    });
    this._menuService.setCurrentRoute(this.router.url);

    this.initDropdown();
    this.initForm();
  }

  initDropdown() {
    //JOBFAM
    this._userService.getJobFam()
    .subscribe(result => {
      if (result.json().confirmed === true) {
        let dropdownValues = result.json().data.Get_JobFam;
        dropdownValues.map(function(item, key)  {
          item['name']   = item['familyName'];
          item['value']   = item['familyCode'].trim();
          // if(key == 0) item['selected'] = true;
        });
        this.jobfamdropdown = dropdownValues;
        $('.ui.jobfamdropdown')
          .dropdown({
            // values: dropdownValues,
            onChange: (value, text, $selected) => {
              this.initGradeDropdown(value);
              this.initDivisionDropdown(value);
            }
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

    //ROLE
    this._userService.getRole()
    .subscribe(result => {
      if (result.json().confirmed === true) {
        let dropdownValues = result.json().data.Get_Role;
        dropdownValues.map(function(item, key)  {
          item['name']   = item['roleName'];
          item['value']   = item['roleCode'].trim();
          // if(key == 0) item['selected'] = true;
        });
        this.roledropdown = dropdownValues;
        $('.ui.roledropdown')
          .dropdown({
            // values: dropdownValues,
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

  initGradeDropdown(idJF) {
    //GRADE
    $('.ui.gradedropdown').addClass('loading disabled');
    $('.ui.gradedropdown').dropdown('clear');
    this._userService.getGrade(idJF)
    .subscribe(result => {
      if (result.json().confirmed === true) {
        let dropdownValues = result.json().data.Get_Grade;
        dropdownValues.map(function(item, key)  {
          item['name']   = item['gradeName'];
          item['value']   = item['gradeCode'].trim();
          // if(key == 0) item['selected'] = true;
        });
        this.gradedropdown = dropdownValues;
        $('.ui.gradedropdown')
          .dropdown({
            // values: dropdownValues,
            onChange: (value, text, $selected) => {}
          });
          $('.ui.gradedropdown').removeClass('loading disabled');
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

  initDivisionDropdown(idJF) {
    //DIVISI
    $('.ui.divisiondropdown').addClass('loading disabled');
    $('.ui.divisiondropdown').dropdown('clear');
    this._userService.getDivisi(idJF)
    .subscribe(result => {
      if (result.json().confirmed === true) {

        let dropdownValues = result.json().data.Get_Division;
        dropdownValues.map(function(item, key)  {
          item['name']   = item['divisionName'];
          item['value']   = item['divisionCode'].trim();
          // if(key == 0) item['selected'] = true;
        });
        this.divisiondropdown = dropdownValues;
        $('.ui.divisiondropdown')
          .dropdown({
            // values: dropdownValues,
            onChange: (value, text, $selected) => {}
          });
        $('.ui.divisiondropdown').removeClass('loading disabled');
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
    // $.fn.form.settings.rules.checkUsername = (value) => {
    //   let returnType = false;
    //   this._userService.checkUsername(value)
    //   .subscribe(result => {
    //     alert("json")
    //     returnType = true
    //   }, err => {
    //     returnType = false
    //   });

    //   setTimeout(() => {
    //     alert("done")
    //     return returnType
    //   }, 2000);
    // };
    $('.ui.form.usercreate')
    .form({
      fields: {
        accountName: {
          identifier: 'accountName',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        fullName: {
          identifier: 'fullName',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        jobfam_id: {
          identifier: 'jobfam_id',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        grade_id: {
          identifier: 'grade_id',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        division_id: {
          identifier: 'division_id',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        password: {
          identifier: 'password',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        email: {
          identifier: 'email',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        roles: {
          identifier: 'roles',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        }
      }, onSuccess: (event, fields) => {

        event.preventDefault();
          this._userService.checkUsername(fields.accountName)
          .subscribe(response => {
            if(response.json().confirmed === true) {
              this._userService.create(fields).subscribe(response => {
              if (response.json().confirmed === true) {
                let usrObj = response.json().data.User_Created;
                this._alertService.setAlert({
                  closable: false,
                  header : {
                    // pot lan
                    type: 'pot',
                    color: 'purple',
                    icon: 'user add',
                    text: 'User Created',
                    subheader: 'User with name ' + usrObj.fullName + ' (<strong>mitrais\\' + usrObj.accountName +'</strong>)'
                  },
                  message: "",
                  button : {
                    size: '',
                    position: 'center',
                    fluid: true,
                    fluidNumber: 'two',
                    ok : {display: true,text: 'Ok!',color: 'purple'},
                    deny : {display : false,text: 'Cancel',color: ''}
                  },
                  onApprove : ($element) => {
                    this.router.navigate(['/users']);
                  },
                  onDeny: ($element) => {}
                });
              } else {
                this._alertService.buildAlertError(response.json().message);
              }
            });
            } else {
              this._alertService.setAlert({
                closable: false,
                header : {
                  // pot lan
                  type: 'pot',
                  color: 'red',
                  icon: 'warning sign',
                  text: 'Username already exis',
                  subheader: 'User with name ' + fields.accountName + ' is already <strong>exist</strong>)'
                },
                message: "",
                button : {
                  size: '',
                  position: 'center',
                  fluid: true,
                  fluidNumber: 'two',
                  ok : {display: true,text: 'Ok!',color: ''},
                  deny : {display : false,text: 'Cancel',color: ''}
                },
                onApprove : ($element) => {

                },
                onDeny: ($element) => {}

              });
            }
          }, err => {
            if(!err.ok) {
              this._alertService.buildAlertError('Sorry, our server is offline');
              this.isLoading = false;
            }
          });
      }, inline: true, on : 'blur'
  });
  }
}
