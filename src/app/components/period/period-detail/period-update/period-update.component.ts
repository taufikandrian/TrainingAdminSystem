import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd }            from '@angular/router';

import { Period } from '../../../../classes/period';

import { UserService } from '../../../../services/user.service';
import { SidebarService } from '../../../../services/sidebar.service';
import { PeriodService } from '../../../../services/period.service';
import { MenuService } from '../../../../services/menu.service';
import { AlertService } from '../../../../services/alert.service';
import { MessageService } from '../../../../services/message.service';

declare var $:any;

@Component({
  selector: 'app-period-update',
  templateUrl: './period-update.component.html',
  styleUrls: ['./period-update.component.css']
})
export class PeriodUpdateComponent implements OnInit {
  private isLoading = true;
  @Input('currentPeriod') currentPeriod: Period;
  @Output() onUpdatePeriod = new EventEmitter<Period>();
  @Output() onUpdateBreadcrumbs = new EventEmitter<any>();

  constructor(private router: Router,
    private _periodService: PeriodService,
    private _userService: UserService,
    private _menuService: MenuService,
    private _sidebarService: SidebarService,
    private _messageService: MessageService,
    private _alertService: AlertService,) {
      this.router.events.subscribe((val) => {
        if(val instanceof NavigationEnd)
          this.initTopMenu()
      })
    }

  initDropdown() {
    $('.ui.statusdropdown').dropdown('set selected', this.currentPeriod.status);
  }

  initDate() {
    $('#start-date-add-period').calendar({
      type: 'date',
      ampm: false,
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
    $('#end-date-add-period').calendar('set date', this.currentPeriod.trainingEndDate)
    $('#start-date-add-period').calendar('set date', this.currentPeriod.trainingStartDate)
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

  initForm() {
    $('.ui.form.periodedit')
    .form({
      fields: {
        roles: {
          identifier: 'roles',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        },
        status: {
          identifier: 'status',
          rules: [{
            type : 'empty',
            prompt : 'Please enter {name}'
          }]
        }
      }, onSuccess: (event, fields) => {
        this.isLoading = true;
        event.preventDefault();
        fields.lastModifiedBy = this._userService.getCurrentUserName();
        if(fields.isOpen == "on") fields.isOpen = true
        else fields.isOpen = false

        this._periodService.update(fields, this.currentPeriod.id).subscribe(response => {
          if (response.json().confirmed === true) {
            let periodObj: Period;
            periodObj = response.json().data.Update_Training;
            periodObj.eligibleList = response.json().data.Update_Training_EligibleParticipants;
            this.currentPeriod = periodObj;
            this.onUpdatePeriod.emit(periodObj);
            this._messageService.setMessage({
              icon: 'checkmark',
              headerMain: 'Successfully',
              headerSub: periodObj.trainingName + ' successfully updated',
              type: 'top tiny positive container'
            })

            this.isLoading = false
          } else {
            this._alertService.buildAlertError(response.json().message);
            this.isLoading = false
          }

        })
      }, inline: true, on : 'blur'
    });
  }

  ngOnInit() {
    this.initTopMenu();
    this.initDropdown();
    this.initDate();
    this.initForm();
    this.isLoading = false;
  }


}
