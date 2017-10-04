import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Router, NavigationEnd }            from '@angular/router';

import { Period } from '../../../../classes/period';

import { UserService } from '../../../../services/user.service';
import { SidebarService } from '../../../../services/sidebar.service';
import { PeriodService } from '../../../../services/period.service';
import { MenuService } from '../../../../services/menu.service';
import { AlertService } from '../../../../services/alert.service';
import { MessageService } from '../../../../services/message.service';

import { Environment } from '../../../../classes/environment';

declare var $:any;

@Component({
  selector: 'app-period-courses',
  templateUrl: './period-courses.component.html',
  styleUrls: ['./period-courses.component.css']
})
export class PeriodCoursesComponent implements OnInit {

  private isLoading = true;
  private eliPartDT: any;
  private eliPartDTSelected = [];
  private eliPartDTUnSelected = [];
  private eliPartDTPages = [];

  @Input('currentPeriod') currentPeriod: Period;
  @Output() onUpdatePeriod = new EventEmitter<Period>();
  @Output() onUpdateBreadcrumbs = new EventEmitter<any>();

  constructor(private router: Router,
    private _periodService: PeriodService,
    private _alertService: AlertService,
    private _userService: UserService,
    private _menuService: MenuService,
    private _messageService: MessageService,
    private _sidebarService: SidebarService,) {

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
        this.initTopMenu()
    })
  }

  initTopMenu() {
    this._sidebarService.hide();
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({visible: false,});
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
      {icon  : 'calendar', name  : 'Periods', route: '/periods'},
      {icon  : 'student', name  : this.currentPeriod.trainingName, route: '/periods/detail/'+this.currentPeriod.id},
    ], active: {icon  : 'book', name  : "Courses/Schedule List", route: ''}, });
  }

  ngOnInit() {
    this.initTopMenu();
  }

}
