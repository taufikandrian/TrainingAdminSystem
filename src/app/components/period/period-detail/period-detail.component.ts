import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart }            from '@angular/router';
import { DatatableService } from '../../../services/datatable.service';
import { LocationStrategy } from '@angular/common';

import { Environment } from '../../../classes/environment';
import { MenuService } from '../../../services/menu.service';
import { AlertService } from '../../../services/alert.service';
import { SidebarService } from '../../../services/sidebar.service';
import { PeriodService } from '../../../services/period.service';
import { UserService } from '../../../services/user.service';

import { Period } from '../../../classes/period';

declare var $:any;

@Component({
  selector: 'app-period-detail',
  templateUrl: './period-detail.component.html',
  styleUrls: ['./period-detail.component.css']
})
export class PeriodDetailComponent implements OnInit {
  private activeRoute = '/periods/detail';

  private currentPeriod: Period;
  private isLoading = true;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private url: LocationStrategy,
    private _alertService: AlertService,
    private _userService: UserService,
    private _periodService: PeriodService,
    private _menuService: MenuService,
    private _sidebarService: SidebarService,) {
      this.activeRoute = this.router.url
    }

  isActiveRoute(routeURL) {
    // alert(routeURL == this.activeRoute)
    return routeURL == this.activeRoute;
  }

  initTopMenu() {
    this._sidebarService.hide();
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({visible: false,});
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
      {icon  : 'calendar', name  : 'Periods', route: '/periods'},
    ], active: {icon  : 'student', name  : this.currentPeriod.trainingName, route: '/periods'}, });
  }

  onUpdatePeriod(updatedPeriod: Period) {
    this.currentPeriod = updatedPeriod;
  }

  ngOnInit() {
    var that = this;
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
        this.activeRoute = val.url;
    })

    this.route.params.subscribe(params => {
      this._periodService.detail(params['id']).subscribe(response => {
        this.currentPeriod = response.json().data.Get_Training;
        this.currentPeriod.eligibleList = response.json().data.Get_Training_EligibleParticipants;
        this.initTopMenu();
        this.isLoading = false
      })
    })
  }

}
