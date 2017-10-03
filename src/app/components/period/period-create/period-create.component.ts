import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd }            from '@angular/router';

import { AlertService } from '../../../services/alert.service';
import { MenuService } from '../../../services/menu.service';
import { MessageService } from '../../../services/message.service';
import { PeriodService } from '../../../services/period.service';
import { UserService } from '../../../services/user.service';

import { Period } from '../../../classes/period';

declare var $:any;

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodCreateComponent implements OnInit {
  private isLoading = true;
  constructor(private router: Router,
    private _menuService: MenuService,
    private _userService: UserService,
    private _messageService: MessageService,
    private _periodService: PeriodService,
    private _alertService: AlertService,) { }

  initTopMenu() {
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({
      icon  : 'calendar',
      main  : 'Create Period/Training',
      sub   : 'Create new Period/Training for Training Admin System',
      size  : 'large',
      visible: true,
    });
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
      {icon  : 'users', name  : 'Periods', route: '/periods'},
    ], active: {icon  : 'calendar', name  : 'Create period/training'}, });
  }

  initDropdown() {
    $('.ui.statusdropdown').dropdown();
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
  }

  initForm() {
      $('.ui.form.periodcreate')
      .form({
        fields: {
          trainingName: {
            identifier: 'trainingName',
            rules: [{
              type : 'empty',
              prompt : 'Please enter {name}'
            }]
          },
          status: {
            identifier: 'status',
            rules: [{
              type : 'empty',
              prompt : 'Please enter {name}'
            }]
          },
          trainingStartDate: {
            identifier: 'trainingStartDate',
            rules: [{
              type : 'empty',
              prompt : 'Please enter {name}'
            }]
          },
          trainingEndDate: {
            identifier: 'trainingEndDate',
            rules: [{
              type : 'empty',
              prompt : 'Please enter {name}'
            }]
          },
        }, onSuccess: (event, fields) => {
          fields.createdBy = this._userService.getCurrentUserName();
          fields.lastModifiedBy = this._userService.getCurrentUserName();

          if(fields.isOpen == "on") fields.isOpen = true
          else fields.isOpen = false
          this.isLoading = true;
          event.preventDefault();
          this._periodService.create(fields).subscribe(response => {
            if (response.json().confirmed === true) {
              let periodObj: Period;
              periodObj = response.json().data.Training_Created;
              this._alertService.setAlert({
                closable: false,
                header : {
                  // pot lan
                  type: 'pot',
                  color: 'purple',
                  icon: 'calendar',
                  text: 'Period/Training Created',
                  subheader: 'Period/Training with name ' + periodObj.trainingName + ' has been craeted.'
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
                  this.router.navigate(['/periods']);
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

  ngOnInit() {
    this.initTopMenu();
    this.initDropdown();
    this.initDate();
    this.initForm();
    this.isLoading = false;
  }

}
