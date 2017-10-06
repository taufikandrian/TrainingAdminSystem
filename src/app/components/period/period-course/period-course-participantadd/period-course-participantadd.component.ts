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
  selector: 'app-period-course-participantadd',
  templateUrl: './period-course-participantadd.component.html',
  styleUrls: ['./period-course-participantadd.component.css']
})
export class PeriodCourseParticipantaddComponent implements OnInit {
  private isLoading = true;
  private DT: any;
  private DTSelected = [];
  private DTUnSelected = [];
  private DTPages = [];

  @Input('currentCourse') currentCourse;
  @Input('currentPeriod') currentPeriod: Period;
  @Output() onUpdate = new EventEmitter<any>();

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
      {icon  : 'bookmark', name  : "Courses/Schedule List", route: '/periods/detail/'+this.currentPeriod.id+"/courses"},
      {icon  : 'bookmark', name  : this.currentCourse.trainingCourseName, route: '/periods/course/'+this.currentCourse.id},
    ], active: {icon  : 'user add', name  : "Add participants", route: ''}, });
  }

  ngOnInit() {
    this.initTopMenu()
    this.initTable()
  }

  initTable() {
    var that = this;
    let _DTClass = '.table-eligibleperiodadd';

    // crear seach box
    $(_DTClass+' tfoot th').each( function () {
      var title = $(this).text();
      if($(this).hasClass('disabled'))
        $(this).html( '<div class="ui small fluid input disabled"><input type="text" placeholder="Disabled" /></div>' );
      else
      $(this).html( '<div class="ui small fluid input"><input type="text" placeholder="Search by '+title.toLowerCase()+' ..." /></div>' );
    });

    // create table
    var DT = $(_DTClass)
        .on( 'processing.dt', ( e, settings, processing ) => {
          if(processing)
            $(_DTClass).closest('.dimmable').find('.dimmer').addClass('active');
          else
            $(_DTClass).closest('.dimmable').find('.dimmer').removeClass('active');
        })
        .DataTable( {
          responsive  : true,
          scrollY     : false,
          deferRender : true,
          processing  : false,
          serverSide  : true,
          // dom: '<"toolbar">frtip',
          dom: '<"ui clearing basic segment no-padding"\
                  <"ui left floated segment basic no-margin no-padding" <"tb-toolbar-addel">>\
                  <"ui right floated segment basic no-margin no-padding"l>\
                >\
                <tr>\
                <"ui clearing basic segment no-padding"\
                  <"ui left floated segment basic no-margin no-padding" <"tb-toolbar-info-addel">>\
                  <"ui right floated segment basic no-margin no-padding"p>\
                >',
          ajax: {
            contentType: 'application/json',
            url: Environment.apiUrl+'/schedule/'+that.currentCourse.id+'/participant/notin',
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
                        <button data-obj='${JSON.stringify(newRow)}' class="ui green button pr-trashbtn"><i class="user add icon"></i> Add</button>\
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
          fnInitComplete: function() {},
          // destroy: true
      });

    this.DT = DT;

    //Edit
    // $(document).on('click', '.pr-editbtn', function() {
    //   let obj = $(this).data('obj');
    //   that.router.navigate(['/periods/detail', obj.id]);
    // });

    //ADD PARTICIPANTS
    $(document).on('click', '.pr-trashbtn', function() {
      let obj  = $(this).data('obj');
      that._alertService.setAlert({
        closable: false,
        header : {
          // pot lan
          type: 'pot',
          color: 'green',
          icon: 'user',
          text: 'Add Confirmation',
          subheader: 'Add Participants with name ' + obj.fullName
        },
        message: "Are you sure?",
        button : {
          size: '',
          position: 'center',
          fluid: true,
          fluidNumber: 'two',
          ok : {display: true,text: 'Yes! please',color: 'green'},
          deny : {display : true,text: 'Cancel',color: ''}
        },
        onApprove : ($element) => {
          that._periodService.addP(that.currentCourse.id, {"userID": [obj.id]} ).subscribe(response => {
            that.reloadTable({ participant: response.json().data.Added_Parrticipants });
            console.log(response.json().data.Added_Parrticipants)
            that._messageService.setMessage({
              icon: 'checkmark',
              headerMain: 'Successfully <i>add</i> Participants',
              headerSub: obj.fullName + ' successfully added',
              type: 'top tiny green container'
            })
            that.DTSelected = []
            that.updateButton();
          });
        },
        onDeny: ($element) => {}
      });
    });

    // CheckBox
    DT.on( 'select', ( e, dt, type, indexes ) => {
      if ( type === 'row' ) {
        var data = DT.rows( indexes ).data().pluck( 'id' );
        for(let i = 0 ; i < data.length ; i++) {
          var id = data[i];
          $('tr[id='+id+']').find('.checkbox').checkbox('check');

          if($.inArray(id, this.DTSelected) === -1)
            this.DTSelected.push( id );

          var index = $.inArray(id, this.DTUnSelected);
          if(index !== -1)
            this.DTUnSelected.splice(index, 1);
        }
      }
      this.updateButton();

    }).on('deselect', (e, dt, type, indexes) => {
      var data = DT.rows( indexes ).data().pluck( 'id' );
      for(let i = 0 ; i < data.length ; i++) {
        var id = data[i];
        $('tr[id='+id+']').find('.checkbox').checkbox('uncheck');

        if($.inArray(id, this.DTUnSelected) === -1)
          this.DTUnSelected.push( id );

        var index = $.inArray(id, this.DTSelected);
        if(index !== -1)
          this.DTSelected.splice( index, 1 );
      }
      this.updateButton();
    });

    // create search fungsi
    DT.columns().every( function () {
      var that = this;
      $( 'input', this.footer() ).on( 'keyup change', function () {
        if ( that.search() !== this.value ) {
          that.search( this.value ).draw();
        }
      });
    });

    // DT TOOLBAR
    $('div.tb-toolbar-addel').html('\
      <div class="ui mini green basic gs-info del-btn button">Add all selected employee <a class="ui mini green circular label">0</a></div>\
      ');
      $('div.tb-toolbar-info-addel').html('<div class="ui buttons">\
      <div class="ui button basic ul-selected no-padding-lf">\</div>\
    </div>');

    //Delete Selected
    $('.gs-info.del-btn').on('click', function() {
      that._alertService.setAlert({
        closable: false,
        header : {
          // pot lan
          type: 'pot',
          color: 'green',
          icon: 'user add',
          text: 'Add Confirmation',
          subheader: 'Delete selected Employee ('+that.DTSelected.length+') to "Participants" in <b>"'+that.currentPeriod.trainingName+'"</b>',
        },
        message: "Are you sure?",
        button : {
          size: '',
          position: 'center',
          fluid: true,
          fluidNumber: 'two',
          ok : {display: true,text: 'Yes! please',color: 'green'},
          deny : {display : true,text: 'Cancel',color: ''}
        },
        onApprove : ($element) => {
          that._periodService.addP(that.currentCourse.id, {"userID": that.DTSelected} ).subscribe(response => {
            that.reloadTable({ participant: response.json().data.Added_Parrticipants });
            that._messageService.setMessage({
              icon: 'checkmark',
              headerMain: 'Successfully <i>add</i> Participants',
              headerSub: that.DTSelected.length + ' successfully added',
              type: 'top tiny green container'
            })
            that.DTSelected = []
            that.updateButton();
          });
          // that._periodService.deleteP(that.currentCourse.id, {"userID": that.DTSelected} ).subscribe(response => {
          //   that.reloadTable({deletedUsers: response.json().data.Added_EligibleUser});
          //   that.DTSelected = [];
          //   that.DTUnSelected = []
          //   that.updateButton();
          // });
        },
        onDeny: ($element) => {}
      });
    });

    //ON DRAW
    DT.on( 'draw', () => {
      if($.inArray(this.DT.page.info().page, this.DTPages) == -1) {
        // page not visited yet
        this.DTPages.push(this.DT.page.info().page);
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
      this.onUpdate.emit({currentCourse: this.currentCourse, currentPeriod: this.currentPeriod, participant: ther.participant});
      this._messageService.setMessage({
        icon: 'checkmark',
        headerMain: 'Successfully Added Eligible Participants',
        headerSub: ther.participant.length + ' employee successfully added',
        type: 'top tiny positive container'
      })
    }
    this.DT.ajax.reload(null, false);
    this.DT.draw();
  }

  updateButton() {

    let selected: Number;
    let unselected: Number;

    if(this.DTSelected.length < 1) {
      selected = 0
      unselected = this.DT.page.info().recordsTotal
    }
    else if(this.DTSelected.length > 0) {
      // if($('.checkallrow').checkbox('is checked') == 'true,false' && this.eliPartDTPages.length != this.eliPartDT.page.info().pages){
      //   selected = this.eliPartDT.page.info().recordsTotal - this.eliPartDTUnSelected.length
      //   unselected = this.eliPartDTUnSelected.length
      // } else {
        selected = this.DTSelected.length
        unselected = this.DT.page.info().recordsTotal - this.DTSelected.length
      // }
    }
    if(selected == 0) {
      $('.gs-info').addClass('disabled')
    } else {
      $('.gs-info').removeClass('disabled')
    }
    $('.ul-selected').html('Selected <b>'+ selected + ' rows</b> of ' + this.DT.page.info().recordsTotal + ' entries');
    $('.gs-info .label').html(selected)
  }

  drawChecked(): void {
    this.DT.rows( ( idx, data, node ) => {
      if($.inArray(data.id, this.DTSelected) !== -1)
        return true;
    }).select();

    this.DT.rows( ( idx, data, node ) => {
      if($.inArray(data.id, this.DTUnSelected) !== -1)
        return true;
    }).deselect();
  }

  toogleCheckAll(): void {
    if($('.checkallrow').checkbox('is checked') == 'true,false'){
      this.DT.rows( ( idx, data, node ) => {
          return true;
      }).select();
    } else {
      this.DT.rows( ( idx, data, node ) => {
        return true;
      }).deselect();
    }
  }

}
