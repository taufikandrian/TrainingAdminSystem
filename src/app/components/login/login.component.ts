import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthenticationService) {
    if (localStorage.getItem('currentUser')) {
      //TODASHBOARD
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    $('.segment.login').addClass('loading');
    this._authService.login(form.value.username, form.value.password).subscribe(result => {
      if (result === true) {
          //TODASHBOARD
          this.router.navigate(['/dashboard']);
      } else {
        swal({
            title: 'Opps!',
            text: "Username or password is not match in our Database!",
            type: 'error',
            width: 300,
        });
      }
      $('.segment.login').removeClass('loading');
    });
  }
}
