import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router }            from '@angular/router';
import { DatatableService } from '../../../services/datatable.service';

import { Environment } from '../../../classes/environment';
import { MenuService } from '../../../services/menu.service';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';
import { SidebarService } from '../../../services/sidebar.service';

declare var $:any;
declare let window;
declare var moment:any;

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.css']
})
export class PeriodListComponent implements OnInit {
  @Output() uploadCheckAll: EventEmitter<any> = new EventEmitter();
  private periodDT: any;
  private periodDTSelected = [];
  constructor(private router: Router,
              private _dtService: DatatableService,
              private _alertService: AlertService,
              private _userService: UserService,
              private _sidebarService: SidebarService,
              private _menuService: MenuService,) { }

  ngOnInit() {
    this._sidebarService.hide();
    this._menuService.setCurrentHeader({
      icon  : 'calendar',
      main  : 'Period List',
      sub   : 'List all periods in Database',
      size  : 'large',
      visible: true,
    });
    let _periodDTClass = '.table-periodtable';

    // crear seach box
    $(_periodDTClass+' tfoot th').each( function () {
      var title = $(this).text();
      if($(this).hasClass('disabled'))
        $(this).html( '<div class="ui small fluid input disabled"><input type="text" placeholder="Disabled" /></div>' );
      else
      $(this).html( '<div class="ui small fluid input"><input type="text" placeholder="Search by '+title.toLowerCase()+' ..." /></div>' );
    });

    // create table
    var _userDT = $(_periodDTClass)
      .on( 'processing.dt', ( e, settings, processing ) => {
        if(processing)
          $(_periodDTClass).closest('.dimmable').find('.dimmer').addClass('active');
        else
          $(_periodDTClass).closest('.dimmable').find('.dimmer').removeClass('active');
      })
      .DataTable( {
        responsive  : true,
        scrollY     : false,
        deferRender : true,
        processing  : false,
        serverSide  : true,
        // dom: '<"toolbar">frtip',
        dom: '<"ui clearing basic segment no-padding"\
                <"ui left floated segment basic no-margin no-padding" <"tb-toolbar">>\
                <"ui right floated segment basic no-margin no-padding"l>\
              >\
              <tr>\
              <"ui clearing basic segment no-padding"\
                <"ui left floated segment basic no-margin no-padding"i>\
                <"ui right floated segment basic no-margin no-padding"p>\
              >',
        ajax: {
          contentType: 'application/json',
          url: Environment.apiUrl+'/training/dt/all',
          type: 'POST',
          data: (d) => {
            return JSON.stringify(d);
          }
        },
        orderMulti: false,
        columns: [
          {
          data: 'anothercolumn',orderable : false,searchable : false,
          render : (data, type, row) => {
            return '<div class="ui fitted checkbox">\
                      <input type="checkbox">\
                      <label></label>\
                    </div>';}
        },
        {
          data: 'trainingName',
          render: (data, type, row) => {
            return data
          }
        },
        {
          data: 'status',
          render: (data, type, row) => {
            return data
          }
        },
        {
          data: 'trainingCourses',
          render: (data, type, row) => {
            return data.length + ' courses'
          }
        },
        {
          data: 'trainingStartDate',
          render: (data, type, row) => {
            function formatDate(date) {
              var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
              ];

              var day = date.getDate();
              var monthIndex = date.getMonth();
              var year = date.getFullYear();

              return day + ' ' + monthNames[monthIndex] + ' ' + year;
            }
            return formatDate(new Date(data))
          }
        },
        {
          data: 'trainingEndDate',
          render: (data, type, row) => {
            function formatDate(date) {
              var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
              ];

              var day = date.getDate();
              var monthIndex = date.getMonth();
              var year = date.getFullYear();

              return day + ' ' + monthNames[monthIndex] + ' ' + year;
            }
            return formatDate(new Date(data))
          }
        },
        {
          data: 'createdBy',
          render: (data, type, row) => {
            return data
          }
        }, {
          data: 'anothercolumn',
          orderable : false,
          searchable : false,
          render : (data, type, row) => {
            return `<div class="ui icon mini buttons">\
                      <button data-usrobj='${JSON.stringify(row)}' class="ui purple button ul-editbtn"><i class="edit icon"></i></button>\
                      <button data-usrobj='${JSON.stringify(row)}' class="ui button ul-infobtn"><i class="info icon"></i></button>\
                      <button data-usrobj='${JSON.stringify(row)}' class="ui button ul-trashbtn"><i class="trash icon"></i></button>\
                    </div>`;
                  }
        },
        ],
        select: {
          style:    'multi', selector: 'td:first-child .checkbox'
        },
        order: [[ 1, 'asc' ]],
        createdRow: function( row, data, dataIndex ) {
          // $(row).attr('id', data.id);
        },
        drawCallback: function (settings, json) {
          // this.api().rows( ( idx, data, node ) => {
          //   if ( $.inArray(data.id, this.userDTSelected) !== -1 ) {
          //     return true;
          //   }
          // }).select();

        }
    });
  }

}
