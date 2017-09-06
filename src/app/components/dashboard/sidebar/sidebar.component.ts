import { Component, OnInit, ElementRef } from '@angular/core';
import { Router }            from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { trainerRoutes } from '../../../classes/route-info';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private location: Location) { }

  ngOnInit() {
    this.menuItems = trainerRoutes.filter(menuItem => menuItem);
    this.getActiveMenu();
  }

  ngAfterViewInit() {
    $('.ui.sidebar')
    .sidebar({
      context: $('.bottom.segment'),
      dimPage: false,
      closable: false
    })
    .sidebar('attach events', '.menu .item.trigger');
  }

  getActiveMenu(){
    var path = this.location.prepareExternalUrl(this.location.path());
    for(var item = 0; item < this.menuItems.length; item++){
        if(this.menuItems[item].path == path){
            this.menuItems[item].class = "active";
        } else {
            this.menuItems[item].class = "";
        }
    }
  }

}
