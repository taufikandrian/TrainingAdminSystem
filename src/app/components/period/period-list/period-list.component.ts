import { AfterViewInit, Component, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { Router }            from '@angular/router';
import { DatatableService } from '../../../services/datatable.service';

import { Environment } from '../../../classes/environment';
import { MenuService } from '../../../services/menu.service';
import { AlertService } from '../../../services/alert.service';
import { SidebarService } from '../../../services/sidebar.service';
import { PeriodService } from '../../../services/period.service';
import { UserService } from '../../../services/user.service';

import { Period } from '../../../classes/period';

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
  private periodDTUnSelected = [];
  private periodDTPages = [];
  constructor(private router: Router,
              private elementRef:ElementRef,
              private _alertService: AlertService,
              private _userService: UserService,
              private _periodService: PeriodService,
              private _sidebarService: SidebarService,
              private _menuService: MenuService,
              private _dtService: DatatableService,) { }

  initTopMenu() {
    this._sidebarService.hide();
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({
      icon  : 'calendar',
      main  : 'List Periods',
      sub   : 'List all periods in Training Admin System',
      size  : 'large',
      visible: true,
    });
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
    ], active: {icon  : 'calendar', name  : 'Periods', route: '/periods'}, });
  }

  ngOnInit() {
    var that = this;

    this.initTopMenu();
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
    var _periodDT = $(_periodDTClass)
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
                <"ui left floated segment basic no-margin no-padding" <"tb-toolbar-info">>\
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
            delete row.trainingDescription
            return `<div class="ui icon mini buttons">\
                      <button data-obj='${JSON.stringify(row)}' class="ui purple button pr-editbtn"><i class="edit icon"></i></button>\
                      <button data-obj='${JSON.stringify(row)}' class="ui button pr-elibtn"><i class="users icon"></i></button>\
                      <button data-obj='${JSON.stringify(row)}' class="ui button pr-schbtn"><i class="bookmark icon"></i></button>\
                      <button data-obj='${JSON.stringify(row)}' class="ui button pr-trashbtn"><i class="trash icon"></i></button>\
                    </div>`;
                  }
        },
        ],
        select: {
          style: 'multi', selector: 'td:first-child .checkbox', info: false
        },
        order: [[ 1, 'asc' ]],
        createdRow: function( row, data, dataIndex ) {
          $(row).attr('id', data.id);
        },
    });

    this.periodDT = _periodDT;

    //Edit
    $(document).on('click', '.pr-editbtn', function() {
      let periodObj = $(this).data('obj');
      that.router.navigate(['/periods/detail', periodObj.id]);
    });

    //Eligibles
    $(document).on('click', '.pr-elibtn', function() {
      let periodObj = $(this).data('obj');
      that.router.navigate(['/periods/detail', periodObj.id, 'eligible']);
    });

    //Schedules
    $(document).on('click', '.pr-schbtn', function() {
      let periodObj = $(this).data('obj');
      that.router.navigate(['/periods/detail', periodObj.id, 'courses']);
    });

    //Delete
    $(document).on('click', '.pr-trashbtn', function() {
      let periodObj  = $(this).data('obj');
      that._alertService.setAlert({
        closable: false,
        header : {
          // pot lan
          type: 'pot',
          color: 'red',
          icon: 'calendar',
          text: 'Delete Confirmation',
          subheader: 'Delete Period/Training with name ' + periodObj.trainingName
        },
        message: "Are you sure?",
        button : {
          size: '',
          position: 'center',
          fluid: true,
          fluidNumber: 'two',
          ok : {display: true,text: 'Yes! please',color: 'red'},
          deny : {display : true,text: 'Cancel',color: ''}
        },
        onApprove : ($element) => {
          that._periodService.delete({"trainingID" : [periodObj.id], "actionBy": that._userService.getCurrentUserName()}).subscribe(response => {
            that.periodDT.ajax.reload(null, false);
          })
        },
        onDeny: ($element) => {}

      });
    });

    // CheckBox
    _periodDT.on( 'select', ( e, dt, type, indexes ) => {
      if ( type === 'row' ) {
        var data = _periodDT.rows( indexes ).data().pluck( 'id' );
        for(let i = 0 ; i < data.length ; i++) {
          var id = data[i];
          $('tr[id='+id+']').find('.checkbox').checkbox('check');

          if($.inArray(id, this.periodDTSelected) === -1)
            this.periodDTSelected.push( id );

          var index = $.inArray(id, this.periodDTUnSelected);
          if(index !== -1)
            this.periodDTUnSelected.splice(index, 1);
        }
      }
      this.updateButton();

    }).on('deselect', (e, dt, type, indexes) => {
      var data = _periodDT.rows( indexes ).data().pluck( 'id' );
      for(let i = 0 ; i < data.length ; i++) {
        var id = data[i];
        $('tr[id='+id+']').find('.checkbox').checkbox('uncheck');

        if($.inArray(id, this.periodDTUnSelected) === -1)
          this.periodDTUnSelected.push( id );

        var index = $.inArray(id, this.periodDTSelected);
        if(index !== -1)
          this.periodDTSelected.splice( index, 1 );
      }
      this.updateButton();
    });

    // create search fungsi
    _periodDT.columns().every( function () {
      var that = this;
      $( 'input', this.footer() ).on( 'keyup change', function () {
        if ( that.search() !== this.value ) {
          that.search( this.value ).draw();
        }
      });
    });

    // DT TOOLBAR
    // $('div.tb-toolbar').html('\
    //   <div class="ui mini gs-info button">Delete <a class="ui mini red circular label">0</a></div>\
    //   <div class="ui mini gs-info button">Delete <a class="ui mini red circular label">0</a></div>\
    //   ');
      $('div.tb-toolbar-info').html('<div class="ui buttons">\
      <div class="ui button basic ul-selected no-padding-lf">\</div>\
    </div>');

    //ON DRAW
    _periodDT.on( 'draw', () => {
      if($.inArray(this.periodDT.page.info().page, this.periodDTPages) == -1) {
        // page not visited yet
        this.periodDTPages.push(this.periodDT.page.info().page);
        this.toogleCheckAll();
      } else {
        // page visited
        this.drawChecked();
      }
    });
  }

  updateButton() {
    let selected: Number;
    let unselected: Number;

    if(this.periodDTSelected.length < 1) {
      selected = 0
      unselected = this.periodDT.page.info().recordsTotal
    }
    else if(this.periodDTSelected.length > 0) {
      if($('.checkallrow').checkbox('is checked') == 'true,false' && this.periodDTPages.length != this.periodDT.page.info().pages){
        selected = this.periodDT.page.info().recordsTotal - this.periodDTUnSelected.length
        unselected = this.periodDTUnSelected.length
      } else {
        selected = this.periodDTSelected.length
        unselected = this.periodDT.page.info().recordsTotal - this.periodDTSelected.length
      }
    }
    if(selected == 0) {
      $('.gs-info').addClass('disabled')
    } else {
      $('.gs-info').removeClass('disabled')
    }
    $('.ul-selected').html('Selected <b>'+ selected + ' rows</b> of ' + this.periodDT.page.info().recordsTotal + ' entries');
    $('.gs-info .label').html(selected)
  }

  drawChecked(): void {
    this.periodDT.rows( ( idx, data, node ) => {
      if($.inArray(data.id, this.periodDTSelected) !== -1)
        return true;
    }).select();

    this.periodDT.rows( ( idx, data, node ) => {
      if($.inArray(data.id, this.periodDTUnSelected) !== -1)
        return true;
    }).deselect();
  }

  toogleCheckAll(): void {
    if($('.checkallrow').checkbox('is checked') == 'true,false'){
      this.periodDT.rows( ( idx, data, node ) => {
          return true;
      }).select();
    } else {
      this.periodDT.rows( ( idx, data, node ) => {
        return true;
      }).deselect();
    }
  }

}
