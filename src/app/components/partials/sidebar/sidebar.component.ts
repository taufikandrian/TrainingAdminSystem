import { Component, OnInit, ElementRef } from '@angular/core';
import { Router }            from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/periods', title: 'Periods',  icon:'calendar', class: '' },
  { path: '/users', title: 'Users',  icon:'users', class: '' },
  { path: '/enrollments', title: 'Enrollments',  icon:'edit', class: '' },
  { path: '/achievements', title: 'Achievements',  icon:'diamond', class: '' },
  { path: '/trainings', title: 'Trainings',  icon:'settings', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private location: Location) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getActiveMenu();
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
