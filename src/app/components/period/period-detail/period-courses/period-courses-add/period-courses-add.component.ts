import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, NavigationEnd }            from '@angular/router';

import { Period } from '../../../../../classes/period';

import { UserService } from '../../../../../services/user.service';
import { SidebarService } from '../../../../../services/sidebar.service';
import { PeriodService } from '../../../../../services/period.service';
import { MenuService } from '../../../../../services/menu.service';
import { AlertService } from '../../../../../services/alert.service';
import { MessageService } from '../../../../../services/message.service';

import { Environment } from '../../../../../classes/environment';

declare var $:any;

@Component({
  selector: 'app-period-courses-add',
  templateUrl: './period-courses-add.component.html',
  styleUrls: ['./period-courses-add.component.css']
})
export class PeriodCoursesAddComponent implements OnInit {

  private isLoading = true;
  private coursesdropdown: any[];
  private roomdropdown: any[];
  private trainerdropdown: any[];

  @Input('currentPeriod') currentPeriod: Period;
  @Output() onUpdatePeriod = new EventEmitter<Period>();
  @Output() onUpdateBreadcrumbs = new EventEmitter<any>();

  constructor(private router: Router,
              private _userService: UserService,
              private _periodService: PeriodService,
              private _menuService: MenuService,
              private _messageService: MessageService,
              private _alertService: AlertService,
              private _sidebarService: SidebarService,) { }

  ngOnInit() {
    this.initTopMenu();
    this.initForm();
    this.initDate();
    this.initDropdown();
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

  initTopMenu() {
    this._sidebarService.hide();
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({visible: false,});
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
      {icon  : 'calendar', name  : 'Periods', route: '/periods'},
      {icon  : 'student', name  : this.currentPeriod.trainingName, route: '/periods/detail/'+this.currentPeriod.id},
    ], active: {icon  : 'add', name  : "New Course/Schedule", route: ''}, });
  }

  initDropdown() {
    let that = this
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

    //TRAINER
    this._periodService.getTrainer()
    .subscribe(result => {
      if (result.json().confirmed === true) {
        let dropdownValues = result.json().data.Get_Trainer;

        this.trainerdropdown = dropdownValues;
        $('.ui.trainerdropdown')
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
        courseType_id: {
          identifier: 'courseType_id',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        trainingCourseName: {
          identifier: 'trainingCourseName',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        trainingType: {
          identifier: 'trainingType',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
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
        classroom_id: {
          identifier: 'classroom_id',
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
        fields.createdBy = this._userService.getCurrentUserName();
        fields.lastModifiedBy = this._userService.getCurrentUserName();

        this._periodService.courseCreate(this.currentPeriod.id, fields).subscribe(response => {
          if (response.json().confirmed === true) {
            let courseObj;
            courseObj = response.json().data.TrainingSchedule_Created;

            this.currentPeriod.trainingCourses.push(courseObj)
            this.onUpdatePeriod.emit(this.currentPeriod);

            this._alertService.setAlert({
              closable: false,
              header : {
                // pot lan
                type: 'pot',
                color: 'purple',
                icon: 'bookmark',
                text: 'Course/Schedule Created',
                subheader: 'Course/Schedule with name ' + courseObj.trainingCourseName + ' has been craeted.'
              },
              message: "",
              button : {
                size: '',
                position: 'center',
                fluid: true,
                fluidNumber: 'two',
                ok : {display: true,text: 'Ok!',color: 'purple'},
                deny : {display : false,text: 'Cancel',color: ''}
              },
              onApprove : ($element) => {
                this.router.navigate(['/periods/detail', this.currentPeriod.id, 'courses']);
              },
              onDeny: ($element) => {}
            });
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
