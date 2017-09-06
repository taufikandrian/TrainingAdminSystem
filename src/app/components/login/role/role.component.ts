import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  loggedUser;
  loggedRoleUser;
  currentRole;
  constructor(private router: Router, private _authService: AuthenticationService) {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedRoleUser = JSON.parse(localStorage.getItem('currentUser')).roles;
    this.currentRole = JSON.parse(localStorage.getItem('currentRoleUser'));
  }

  ngOnInit() {

    let dropdownValues = this.loggedRoleUser;

    dropdownValues.map(function(item, key)  {
      item['name']   = item['roles_name'];
      item['value']   = item['roles_code'];

    });

    let key = 0 ;
    dropdownValues.forEach(element => {
      if(this.currentRole && this.currentRole[0].roles_code == element['roles_code'])
        element['selected'] = true;
      if(key == 0)
        element['selected'] = true;
      key++;
    });
    $('.ui.roledropdown')
      .dropdown({
        values: dropdownValues
      })
    ;
  }

  setRole(form: NgForm) {
    $('.segment.setRole').addClass('loading');
    if(this._authService.setRole($('.ui.roledropdown').dropdown('get value'))){
      this.router.navigate(['/dashboard']);
    } else {
      swal({
          title: 'Opps!',
          text: "There is an error in our Application!",
          type: 'error',
          width: 300,
      });
    }
  }

}
