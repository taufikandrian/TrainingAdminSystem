import { Component, OnInit, ElementRef } from '@angular/core';
import { Router }            from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { allRoutes, trainerRoutes, managerRoutes, staffRoutes } from '../../../classes/route-info';

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
    let curRole = JSON.parse(localStorage.getItem('currentRoleUser'));

    if(curRole[0].roles_code == "ST")
      this.menuItems = staffRoutes.filter(menuItem => menuItem);
    else if(curRole[0].roles_code == "TR")
      this.menuItems = trainerRoutes.filter(menuItem => menuItem);
    else if(curRole[0].roles_code == "MG")
      this.menuItems = managerRoutes.filter(menuItem => menuItem);
    else if(curRole[0].roles_code == "AD")
      this.menuItems = allRoutes.filter(menuItem => menuItem);

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
