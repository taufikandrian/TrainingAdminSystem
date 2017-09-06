import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  loggedUser;
  loggedRoleUser;
  constructor(private router: Router, private _authService: AuthenticationService) {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedRoleUser = JSON.parse(localStorage.getItem('currentRoleUser'))[0];
  }

  ngOnInit() {}

  logout(): void {
    if(this._authService.logout()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
