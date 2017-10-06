import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart }            from '@angular/router';
import { DatatableService } from '../../../services/datatable.service';
import { LocationStrategy } from '@angular/common';
import { DatePipe } from '@angular/common';

import { Environment } from '../../../classes/environment';
import { MenuService } from '../../../services/menu.service';
import { AlertService } from '../../../services/alert.service';
import { SidebarService } from '../../../services/sidebar.service';
import { PeriodService } from '../../../services/period.service';
import { UserService } from '../../../services/user.service';

import { Period } from '../../../classes/period';

@Component({
  selector: 'app-period-course',
  templateUrl: './period-course.component.html',
  styleUrls: ['./period-course.component.css']
})
export class PeriodCourseComponent implements OnInit {
  private activeRoute = '/periods/course';
  private currentCourse;
  private currentPeriod: Period;
  private isLoading = true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private url: LocationStrategy,
    private dp: DatePipe,
    private _alertService: AlertService,
    private _userService: UserService,
    private _periodService: PeriodService,
    private _menuService: MenuService,
    private _sidebarService: SidebarService,) {
      this.activeRoute = this.router.url
    }

  isActiveRoute(routeURL) {
    return routeURL == this.activeRoute;
  }

  onUpdate(data) {
    this.currentCourse = data.currentCourse
    this.currentPeriod = data.currentPeriod
    data.participant.forEach(element => {
      this.currentCourse.participant.push(element)
    });
  }

  ngOnInit() {
    var that = this;
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
        this.activeRoute = val.url;
    })

    this.route.params.subscribe(params => {
      this._periodService.getCourse(params['id']).subscribe(response => {
        this.currentCourse = response.json().data.Course_Detail;
        this.currentPeriod = response.json().data.Course_Training;
        this.currentCourse.participant = response.json().data.Course_Participants;
        this.initTopMenu();
        this.isLoading = false
      })
    })
  }

  initTopMenu() {
    this._sidebarService.hide();
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({
      icon  : 'student',
      main  : this.currentPeriod.trainingName,
      sub   : this.dp.transform(this.currentPeriod.trainingStartDate, ('EEEE, d MMM y')) +' - '+ this.dp.transform(this.currentPeriod.trainingEndDate, ('EEEE, d MMM y')),
      size  : 'large',
      visible: true,
    });
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
      {icon  : 'calendar', name  : 'Periods', route: '/periods'},
      {icon  : 'student', name  : this.currentPeriod.trainingName, route: '/periods/detail/'+this.currentPeriod.id},
      {icon  : 'bookmark', name  : "Courses/Schedule List", route: '/periods/detail/'+this.currentPeriod.id+"/courses"},
    ], active: {icon  : 'bookmark', name  : this.currentCourse.trainingCourseName, route: ''}, });
  }

}
