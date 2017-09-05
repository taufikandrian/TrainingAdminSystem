import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthenticationService) {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    $('.dropdown:not(.custom)').dropdown();

    $('.ui.sidebar')
      .sidebar({
        context: $('.bottom.segment')
      })
      .sidebar('attach events', '.menu .item.trigger');
  }

  logout(): void {
    if(this._authService.logout()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
