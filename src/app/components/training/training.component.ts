import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal: any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  constructor(private router: Router) {
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
