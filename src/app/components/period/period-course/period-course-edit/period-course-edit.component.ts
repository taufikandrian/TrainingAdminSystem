import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  selector: 'app-period-course-edit',
  templateUrl: './period-course-edit.component.html',
  styleUrls: ['./period-course-edit.component.css']
})
export class PeriodCourseEditComponent implements OnInit {
  private isLoading = true;
  private coursesdropdown: any[];
  private roomdropdown: any[];

  @Input('currentCourse') currentCourse;
  @Input('currentPeriod') currentPeriod: Period;
  @Output() onUpdate = new EventEmitter<any>();

  constructor(private router: Router,
    private _userService: UserService,
    private _periodService: PeriodService,
    private _menuService: MenuService,
    private dp: DatePipe,
    private _messageService: MessageService,
    private _alertService: AlertService,
    private _sidebarService: SidebarService,) {
      this.router.events.subscribe((val) => {
        if(val instanceof NavigationEnd)
          this.initTopMenu()
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
  ngOnInit() {
    this.initTopMenu();
    this.initDate();
    this.initDropdown();
    this.initData();
    this.initForm();
  }

  initData() {
    $('#start-date-add-period').calendar('set date', this.currentCourse.trainingCourseStartDate)
    $('#end-date-add-period').calendar('set date', this.currentCourse.trainingCourseEndDate)
    $('#start-time-add-period').calendar('set date', this.currentCourse.trainingCourseStartTime)
    $('#end-time-add-period').calendar('set date', this.currentCourse.trainingCourseEndTime)

    // $('.ui.roomdropdown').dropdown('set value', this.currentCourse.classroom.id)
  }
  initDate() {
    let that = this
    $('#start-date-add-period').calendar({
      type: 'date',
      minDate: new Date(that.currentPeriod.trainingStartDate),
      maxDate: new Date(that.currentPeriod.trainingEndDate),
      endCalendar: $('#end-date-add-period'),
      formatter: {
        date: function (date, settings) {
          if (!date) return '';
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          return year + '-' + month + '-' + day;
        }
      }
    });

    $('#end-date-add-period').calendar({
      type: 'date',
      minDate: new Date(that.currentPeriod.trainingStartDate),
      maxDate: new Date(that.currentPeriod.trainingEndDate),
      startCalendar: $('#start-date-add-period'),
      formatter: {
        date: function (date, settings) {
          if (!date) return '';

          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          return year + '-' + month + '-' + day;
        }
      }
    });
    $('#start-time-add-period').calendar({
      type: 'time',
      ampm: false,
      endCalendar: $('#end-time-add-period'),
      formatter: {
        time: function(time, seetings) {
          let newHour, curHour = time.getHours().toString();
          let newMinute, curMinute = time.getMinutes().toString();

          if(curHour.length != 2)
            newHour = '0'+curHour
          else newHour = curHour

          if(curMinute.length != 2)
            newMinute = '0'+curMinute
          else newMinute = curMinute

          return newHour +':'+ newMinute + ":00"
        }
      }
    });

    $('#end-time-add-period').calendar({
      type: 'time',
      ampm: false,
      startCalendar: $('#start-time-add-period'),
      formatter: {
        time: function(time, seetings) {
          let newHour, curHour = time.getHours().toString();
          let newMinute, curMinute = time.getMinutes().toString();

          if(curHour.length != 2)
            newHour = '0'+curHour
          else newHour = curHour

          if(curMinute.length != 2)
            newMinute = '0'+curMinute
          else newMinute = curMinute

          return newHour +':'+ newMinute + ":00"
        }
      }
    });

  }

  initDropdown() {
    let that = this
    $('.ui.statusdropdown').dropdown();
    $('.ui.statusdropdown').dropdown('set selected', this.currentCourse.status);
    $('.ui.typedropdown').dropdown({
      onChange: (value, text, $selected) => {
        if(value == "Periodically") {

          $('.ui.form.periodcoursescreate').form('remove fields', ['trainingCourseEndDate'])
          $('#start-date-add-period').calendar({
            type: 'date',
            minDate: new Date(that.currentPeriod.trainingStartDate),
            maxDate: new Date(that.currentPeriod.trainingEndDate),
            formatter: {
              date: function (date, settings) {
                if (!date) return '';
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return year + '-' + month + '-' + day;
              }
            }
          });
          $('#end-date-add-period').calendar('clear');
          $('#end-date-add-period').addClass('disabled');
          $('.ui.form.periodcoursescreate').form('validate field', 'trainingCourseEndDate')
        }
        else {
          $('.ui.form.periodcoursescreate').form('add rule', 'trainingCourseEndDate',{
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter {name}'
              }
            ]
          })
          $('#end-date-add-period').removeClass('disabled');
          $('#start-date-add-period').calendar({
            type: 'date',
            minDate: new Date(that.currentPeriod.trainingStartDate),
            maxDate: new Date(that.currentPeriod.trainingEndDate),
            endCalendar: $('#end-date-add-period'),
            formatter: {
              date: function (date, settings) {
                if (!date) return '';
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return year + '-' + month + '-' + day;
              }
            }
          });
        }
      }
    });

    //COURSES
    this._periodService.getCourses()
    .subscribe(result => {
      if (result.json().confirmed === true) {
        let dropdownValues = result.json().data.Get_courseType;
        this.coursesdropdown = dropdownValues;
        $('.ui.coursesdropdown')
        .dropdown({
          onChange: (value, text, $selected) => {}
        });
      } else {

        this._alertService.buildAlertError(result.json().message);
      }
      this.isLoading = false;
    },
    err => {
      if(!err.ok) {
        this._alertService.buildAlertError('Sorry, our server is offline');
        this.isLoading = false;
      }
    });

    //CLASSROOM
    this._periodService.getClassroom()
    .subscribe(result => {
      if (result.json().confirmed === true) {
        let dropdownValues = result.json().data.Get_Classroom;

        this.roomdropdown = dropdownValues;
        $('.ui.roomdropdown')
          .dropdown({
            onChange: (value, text, $selected) => {}
          });

      } else {

        this._alertService.buildAlertError(result.json().message);
      }
      this.isLoading = false;
    },
    err => {
      if(!err.ok) {
        this._alertService.buildAlertError('Sorry, our server is offline');
        this.isLoading = false;
      }
    });
  }

  initForm() {
    $('.ui.form.periodcoursescreate')
    .form({
      fields: {
        trainingCourseStartDate: {
          identifier: 'trainingCourseStartDate',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        trainingCourseEndDate: {
          identifier: 'trainingCourseEndDate',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        trainingCourseStartTime: {
          identifier: 'trainingCourseStartTime',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        trainingCourseEndTime: {
          identifier: 'trainingCourseEndTime',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        trainingCourseCapacity: {
          identifier: 'trainingCourseCapacity',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
      }, onSuccess: (event, fields) => {
        this.isLoading = true;
        if($('.ui.typedropdown').dropdown('get value') == 'Periodically') {
          fields.trainingCourseEndDate =  fields.trainingCourseStartDate
        }
        fields.lastModifiedBy = this._userService.getCurrentUserName();

        this._periodService.updateCourses(this.currentCourse.id, fields).subscribe(response => {
          console.log(response.json())
          if (response.json().confirmed === true) {
            this.currentCourse = response.json().data.Update_Training_Course;
            this.onUpdate.emit({ currentCourse: this.currentCourse });
            this._messageService.setMessage({
              icon: 'checkmark',
              headerMain: 'Successfully',
              headerSub: this.currentCourse.trainingCourseName+ ' successfully updated',
              type: 'top tiny positive container'
            })
            this.isLoading = false
          } else {

            this._alertService.buildAlertError(response.json().data.UserFailedCreate);
          }
        }, err => {
          if(!err.ok) {
            this._alertService.buildAlertError('Sorry, our server is offline');
            this.isLoading = false;
          }
        })

      }, inline: true, on : 'blur'
    });
  }
}
