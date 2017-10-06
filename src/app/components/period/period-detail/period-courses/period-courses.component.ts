import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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
  selector: 'app-period-courses',
  templateUrl: './period-courses.component.html',
  styleUrls: ['./period-courses.component.css']
})
export class PeriodCoursesComponent implements OnInit {

  private isLoading = true;
  private DT: any;
  private DTSelected = [];
  private DTUnSelected = [];
  private DTPages = [];

  @Input('currentPeriod') currentPeriod: Period;
  @Output() onUpdatePeriod = new EventEmitter<Period>();
  @Output() onUpdateBreadcrumbs = new EventEmitter<any>();

  constructor(private router: Router,
    public datepipe: DatePipe,
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

  initTable() {
    var that = this;
    let _DTClass = '.table-dt';

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
            url: Environment.apiUrl+'/schedule/dt/all/'+this.currentPeriod.id,
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
          }, {
            data: 'trainingCourseName',
            // render: (data, type, row) => {
            //   return data + "<br><i>" + row.email + "<i>"
            // }
          }, {
            data: 'trainingCourseTrainer',orderable : false,searchable : false,
            render: function (data, type, row) {
              let backupTrainer = ''
              if(row.trainingCourseTrainer[1]) {
                backupTrainer = row.trainingCourseTrainer[1].fullName
              }
              if(row.trainingCourseTrainer[0])
                return '<b>'+row.trainingCourseTrainer[0].fullName+'</b><br><i>' + backupTrainer +'</i>'
              else return "no trainer" }
          }, {
            data: 'classroom.courseClassroomName',
            render: (data, type, row) => {
              return data + "<br><i>" + row.classroom.courseClassroomLocation + "<i>"
            }
          }, {
            data: 'trainingCourseStartDate',
            render: (data, type, row) => {
              if(row.trainingType == "Periodically")
                return "Periodically on <b>" + that.datepipe.transform(data, 'EEEE') + "</b>"
              else
                return '<i class="icon play"></i> ' + that.datepipe.transform(data, 'MMM d, y') +'<br><i class="icon stop"></i> ' + that.datepipe.transform(row.trainingCourseEndDate, 'MMM d, y');
            }
          },{
            data: 'trainingCourseStartTime',
            render: (data, type, row) => {
              return '<i class="icon play"></i> ' + data +'<br><i class="icon stop"></i> ' + row.trainingCourseEndTime;
            }
          },{
            data: 'createdBy',
            render: (data, type, row) => {
              return data + "<br><i>" + that.datepipe.transform(row.creationDate, 'MMM d, y') + "<i>"
            }
          },{
            data: 'lastModifiedBy',
            render: (data, type, row) => {
              return data + "<br><i>" + that.datepipe.transform(row.lastModifiedDate, 'MMM d, y') + "<i>"
            }
          },{
            data: 'anothercolumn',
            orderable : false,
            searchable : false,
            render : (data, type, row) => {
              delete row.trainingDescription
              let newRow = {
                id: row.id,
                trainingCourseName: row.trainingCourseName
              }
              return `<div class="ui icon mini buttons">\
                        <button data-obj='${JSON.stringify(newRow)}' class="ui purple button pr-editbtn"><i class="edit icon"></i></button>\
                        <button data-obj='${JSON.stringify(newRow)}' class="ui button pr-trashbtn"><i class="trash icon"></i> </button>\
                      </div>`;
                    }
          },
          ],
          select: {
            style: 'multi', selector: 'td:first-child .checkbox', info: false
          },
          order: [[ 1, 'asc' ]],
          columnDefs: [
            // { className: "center aligned", "targets": [ 3 ] }
          ],
          createdRow: function( row, data, dataIndex ) {
            $(row).attr('id', data.id);
          },
          fnInitComplete: function() {},
          // destroy: true
      });

    this.DT = DT;

    // Edit
    $(document).on('click', '.pr-editbtn', function() {
      let obj = $(this).data('obj');
      that.router.navigate(['/periods/course', obj.id]);
    });

    //Add user
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
          subheader: 'Delete course/schedule ('+obj.trainingCourseName+') from "'+that.currentPeriod.trainingName+'"',
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
          //DELETE ONE Course
          that._periodService.deleteCourses({"trainingCourseID": [obj.id]} ).subscribe(response => {
            that.reloadTable({newTrainingCourses: response.json().data.Training_Courses});
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
    $('div.tb-toolbar-info-addel').html('<div class="ui buttons">\
      <div class="ui button basic ul-selected no-padding-lf">\</div>\
    </div>');

    //Add Selected
    // $('.gs-info.del-btn').on('click', function() {
    //   that._alertService.setAlert({
    //     closable: false,
    //     header : {
    //       // pot lan
    //       type: 'pot',
    //       color: 'red',
    //       icon: 'trash',
    //       text: 'Delete Confirmation',
    //       subheader: 'Delete selected Course/Schedule ('+that.DTSelected.length+') in <b>"'+that.currentPeriod.trainingName+'"</b>',
    //     },
    //     message: "Are you sure?",
    //     button : {
    //       size: '',
    //       position: 'center',
    //       fluid: true,
    //       fluidNumber: 'two',
    //       ok : {display: true,text: 'Yes! please',color: 'red'},
    //       deny : {display : true,text: 'Cancel',color: ''}
    //     },
    //     onApprove : ($element) => {
    //       that._periodService.addEP(that.currentPeriod.id, {"userID": that.DTSelected} ).subscribe(response => {
    //         that.reloadTable({addedUsers: response.json().data.Added_EligibleUser, training: response.json().data.Get_Training, alleli: response.json().data.Get_Training_EligibleParticipants});
    //         let updatedPeriod: Period;
    //         updatedPeriod = response.json().data.Get_Training;
    //         updatedPeriod.eligibleList = response.json().data.Get_Training_EligibleParticipants;
    //         that.onUpdatePeriod.emit(updatedPeriod);
    //         that.DTSelected = [];
    //         that.DTUnSelected = []
    //         that.updateButton();
    //       });
    //     },
    //     onDeny: ($element) => {}
    //   });
    // });

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
      this.currentPeriod.trainingCourses = ther.newTrainingCourses
      this.onUpdatePeriod.emit(this.currentPeriod);
      this._messageService.setMessage({
        icon: 'checkmark',
        headerMain: 'Successfully Delete Courses/Schedules',
        headerSub: ther.newTrainingCourses.length + '  Courses/Schedules successfully deleted',
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
    if($('.checkallrow-dt').checkbox('is checked') == 'true,false'){
      this.DT.rows( ( idx, data, node ) => {
          return true;
      }).select();
    } else {
      this.DT.rows( ( idx, data, node ) => {
        return true;
      }).deselect();
    }
  }

  ngOnInit() {
    this.initTopMenu();
    this.initTable();
    // this.updateButton();
  }

}
