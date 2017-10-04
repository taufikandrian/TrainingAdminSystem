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
  selector: 'app-period-eligible',
  templateUrl: './period-eligible.component.html',
  styleUrls: ['./period-eligible.component.css']
})
export class PeriodEligibleComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {

    if ( $.fn.dataTable.isDataTable( '.table-eliparttable' ) ) {
      // this.eliPartDT.rows().deselect();
      $('.table-eliparttable').DataTable().destroy();
    }
    this.eliPartDTSelected = [];
    this.eliPartDTUnSelected = [];
    this.eliPartDTPages = [];
    $('.checkallrow-eliparttable').checkbox('set unchecked')
    // this.eliPartDT.state.clear();
  }

  initTopMenu() {
    this._sidebarService.hide();
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({visible: false,});
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
      {icon  : 'calendar', name  : 'Periods', route: '/periods'},
      {icon  : 'student', name  : this.currentPeriod.trainingName, route: '/periods/detail/'+this.currentPeriod.id},
    ], active: {icon  : 'users', name  : "Eligible participants", route: ''}, });
  }

  initTable() {
    var that = this;
    let _eliPartDTClass = '.table-eliparttable';

    // crear seach box
    $(_eliPartDTClass+' tfoot th').each( function () {
      var title = $(this).text();
      if($(this).hasClass('disabled'))
        $(this).html( '<div class="ui small fluid input disabled"><input type="text" placeholder="Disabled" /></div>' );
      else
      $(this).html( '<div class="ui small fluid input"><input type="text" placeholder="Search by '+title.toLowerCase()+' ..." /></div>' );
    });

    // create table
    var eliPartDT = $(_eliPartDTClass)
        .on( 'processing.dt', ( e, settings, processing ) => {
          if(processing)
            $(_eliPartDTClass).closest('.dimmable').find('.dimmer').addClass('active');
          else
            $(_eliPartDTClass).closest('.dimmable').find('.dimmer').removeClass('active');
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
            url: Environment.apiUrl+'/training/'+this.currentPeriod.id+'/eligible/all',
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
            data: 'fullName',
            render: (data, type, row) => {
              return data + "<br><i>" + row.email + "<i>"
            }
          },{
            data: 'grade.gradeName',
            render: function (data, type, row) {
              return '<b>'+row.grade.gradeName+'</b><br>' +  row.division.jobFamily.familyCode + ' - ' + row.division.divisionCode }
          }, {
            data: 'anothercolumn',
            orderable : false,
            searchable : false,
            render : (data, type, row) => {
              delete row.trainingDescription
              let newRow = {
                id: row.id,
                fullName: row.fullName,
              }
              return `<div class="ui icon mini buttons">\
                        <button data-obj='${JSON.stringify(newRow)}' class="ui button pr-trashbtn"><i class="trash icon"></i></button>\
                      </div>`;
                    }
          },
          ],
          select: {
            style: 'multi', selector: 'td:first-child .checkbox', info: false
          },
          order: [[ 1, 'asc' ]],
          columnDefs: [
            { className: "center aligned", "targets": [ 3 ] }
          ],
          createdRow: function( row, data, dataIndex ) {
            $(row).attr('id', data.id);
          },

          // destroy: true
      });

    this.eliPartDT = eliPartDT;
    //Edit
    $(document).on('click', '.pr-editbtn', function() {
      let obj = $(this).data('obj');
      that.router.navigate(['/periods/detail', obj.id]);
    });

    //Delete
    $(document).on('click', '.pr-trashbtn', function() {
      let obj  = $(this).data('obj');
      that._alertService.setAlert({
        closable: false,
        header : {
          // pot lan
          type: 'pot',
          color: 'red',
          icon: 'user',
          text: 'Delete Confirmation',
          subheader: 'Delete Eligible User with name ' + obj.fullName
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
          that._periodService.deleteEP(that.currentPeriod.id, {"userID": [obj.id]} ).subscribe(response => {
            that.reloadTable();
            that._messageService.setMessage({
              icon: 'checkmark',
              headerMain: 'Successfully <i>remove</i> Eligible Participants',
              headerSub: obj.fullName + ' successfully removed',
              type: 'top tiny warning container'
            })
            that.eliPartDTSelected = []
            that.updateButton();
          });
        },
        onDeny: ($element) => {}
      });
    });

    // CheckBox
    eliPartDT.on( 'select', ( e, dt, type, indexes ) => {
      if ( type === 'row' ) {
        var data = eliPartDT.rows( indexes ).data().pluck( 'id' );
        for(let i = 0 ; i < data.length ; i++) {
          var id = data[i];
          $('tr[id='+id+']').find('.checkbox').checkbox('check');

          if($.inArray(id, this.eliPartDTSelected) === -1)
            this.eliPartDTSelected.push( id );

          var index = $.inArray(id, this.eliPartDTUnSelected);
          if(index !== -1)
            this.eliPartDTUnSelected.splice(index, 1);
        }
      }
      this.updateButton();

    }).on('deselect', (e, dt, type, indexes) => {
      var data = eliPartDT.rows( indexes ).data().pluck( 'id' );
      for(let i = 0 ; i < data.length ; i++) {
        var id = data[i];
        $('tr[id='+id+']').find('.checkbox').checkbox('uncheck');

        if($.inArray(id, this.eliPartDTUnSelected) === -1)
          this.eliPartDTUnSelected.push( id );

        var index = $.inArray(id, this.eliPartDTSelected);
        if(index !== -1)
          this.eliPartDTSelected.splice( index, 1 );
      }
      this.updateButton();
    });

    // create search fungsi
    eliPartDT.columns().every( function () {
      var that = this;
      $( 'input', this.footer() ).on( 'keyup change', function () {
        if ( that.search() !== this.value ) {
          that.search( this.value ).draw();
        }
      });
    });

    // DT TOOLBAR
    $('div.tb-toolbar').html('\
      <div class="ui mini gs-info del-btn button">Delete All Selected <a class="ui mini red circular label">0</a></div>\
      ');
      $('div.tb-toolbar-info').html('<div class="ui buttons">\
      <div class="ui button basic ul-selected no-padding-lf">\</div>\
    </div>');

    //Delete Selected
    $('.gs-info.del-btn').on('click', function() {
      that._alertService.setAlert({
        closable: false,
        header : {
          // pot lan
          type: 'pot',
          color: 'red',
          icon: 'user',
          text: 'Delete Confirmation',
          subheader: 'Delete selected Eligible User with ' + that.eliPartDTSelected.length + ' total data'
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
          that._periodService.deleteEP(that.currentPeriod.id, {"userID": that.eliPartDTSelected} ).subscribe(response => {
            let updatedPeriod: Period;
            updatedPeriod = response.json().data.Get_Training;
            updatedPeriod.eligibleList = response.json().data.Get_Training_EligibleParticipants;
            that.onUpdatePeriod.emit(updatedPeriod);
            that._messageService.setMessage({
              icon: 'checkmark',
              headerMain: 'Successfully <i>remove</i> Eligible Participants',
              headerSub: that.eliPartDTSelected.length + ' employee successfully removed',
              type: 'top tiny warning container'
            })
            that.reloadTable();
            that.eliPartDTSelected = [];
            that.updateButton();
          });
        },
        onDeny: ($element) => {}
      });
    });

    //ON DRAW
    eliPartDT.on( 'draw', () => {
      if($.inArray(this.eliPartDT.page.info().page, this.eliPartDTPages) == -1) {
        // page not visited yet
        this.eliPartDTPages.push(this.eliPartDT.page.info().page);
        this.toogleCheckAll();
      } else {
        // page visited
        this.drawChecked();
      }
      this.updateButton();
    });
  }

  reloadTable(ther = null) {
    if(ther != null) {
      let updatedPeriod: Period;
      updatedPeriod = ther.training;
      updatedPeriod.eligibleList = ther.alleli;
      this.onUpdatePeriod.emit(updatedPeriod);
      this._messageService.setMessage({
        icon: 'checkmark',
        headerMain: 'Successfully Added Eligible Participants',
        headerSub: ther.addedUsers.length + ' employee successfully added',
        type: 'top tiny positive container'
      })
    }
    this.eliPartDT.ajax.reload(null, false);
    this.eliPartDT.draw();
  }

  updateButton() {

    let selected: Number;
    let unselected: Number;

    if(this.eliPartDTSelected.length < 1) {
      selected = 0
      unselected = this.eliPartDT.page.info().recordsTotal
    }
    else if(this.eliPartDTSelected.length > 0) {
      // if($('.checkallrow').checkbox('is checked') == 'true,false' && this.eliPartDTPages.length != this.eliPartDT.page.info().pages){
      //   selected = this.eliPartDT.page.info().recordsTotal - this.eliPartDTUnSelected.length
      //   unselected = this.eliPartDTUnSelected.length
      // } else {
        selected = this.eliPartDTSelected.length
        unselected = this.eliPartDT.page.info().recordsTotal - this.eliPartDTSelected.length
      // }
    }
    if(selected == 0) {
      $('.gs-info').addClass('disabled')
    } else {
      $('.gs-info').removeClass('disabled')
    }
    $('.ul-selected').html('Selected <b>'+ selected + ' rows</b> of ' + this.eliPartDT.page.info().recordsTotal + ' entries');
    $('.gs-info .label').html(selected)
  }

  drawChecked(): void {
    this.eliPartDT.rows( ( idx, data, node ) => {
      if($.inArray(data.id, this.eliPartDTSelected) !== -1)
        return true;
    }).select();

    this.eliPartDT.rows( ( idx, data, node ) => {
      if($.inArray(data.id, this.eliPartDTUnSelected) !== -1)
        return true;
    }).deselect();
  }

  toogleCheckAll(): void {
    if($('.checkallrow').checkbox('is checked') == 'true,false'){
      this.eliPartDT.rows( ( idx, data, node ) => {
          return true;
      }).select();
    } else {
      this.eliPartDT.rows( ( idx, data, node ) => {
        return true;
      }).deselect();
    }
  }

  ngOnInit() {
    this.initTopMenu();
    this.initTable();
    this.updateButton();
  }
}
