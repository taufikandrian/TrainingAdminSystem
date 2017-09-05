import { Component, OnInit, ElementRef } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

declare var $:any;
declare var swal: any;

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {

  constructor(
    private router: Router,
    ) {
      if (!localStorage.getItem('currentUser')) {
        this.router.navigate(['/login']);
      }
  }

  ngOnInit() {

    $('.dropdown:not(.custom)').dropdown();

    $('.ui.sidebar')
      .sidebar({
        context: $('.bottom.segment'),
        dimPage: false
      })
      .sidebar('attach events', '.menu .item.trigger');
  }

}
