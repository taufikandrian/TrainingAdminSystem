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

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  // @Output() uploadCheckAll: EventEmitter<any> = new EventEmitter();
  private userDT: any;
  private userDTSelected = [];
  private userDTUnSelected = [];
  private userDTPages = [];
  constructor(private router: Router,
              private _dtService: DatatableService,
              private _alertService: AlertService,
              private _userService: UserService,
              private _sidebarService: SidebarService,
              private _menuService: MenuService,) {
                // window["my_unique_class_name"]=this;
              }

  initTopMenu() {
    this._sidebarService.hide();
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({
      icon  : 'users',
      main  : 'List Users',
      sub   : 'List all users in Training Admin System',
      size  : 'large',
      visible: true,
    });
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
    ], active: {icon  : 'users', name  : 'Users', route: '/users'}, });
  }

  ngOnInit() {
    var that = this;

    this.initTopMenu();
    let _userDTClass = '.table-usertable';

    // crear seach box
    $(_userDTClass+' tfoot th').each( function () {
      var title = $(this).text();
      if($(this).hasClass('disabled'))
        $(this).html( '<div class="ui small fluid input disabled"><input type="text" placeholder="Disabled" /></div>' );
      else
      $(this).html( '<div class="ui small fluid input"><input type="text" placeholder="Search by '+title.toLowerCase()+' ..." /></div>' );
    });

    // create table
    var _userDT = $(_userDTClass)
      .on( 'processing.dt', ( e, settings, processing ) => {
        if(processing)
          $(_userDTClass).closest('.dimmable').find('.dimmer').addClass('active');
        else
          $(_userDTClass).closest('.dimmable').find('.dimmer').removeClass('active');
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
          url: Environment.apiUrl+'/users/dt/all',
          type: 'POST',
          data: (d) => {
            return JSON.stringify(d);
          }
        },
        columns: [{
          data: 'anothercolumn',orderable : false,searchable : false,
          render : (data, type, row) => {
            return '<div class="ui fitted checkbox">\
                      <input type="checkbox">\
                      <label></label>\
                    </div>';}
        }, {
          data: 'accountName',
          render: function (data, type, row) {
            return '<strong>mitrais\\' + data + '</strong>' || ''; }
        }, {
          data: 'fullName',
          render: (data, type, row) => {
            return data + "<br><i>" + row.email + "<i>"
          }
        }, {
          data: 'roleList',
          orderable : false,
          searchable : false,
          render: (data, type, row) => {
            let dataToReturn = '';
            let key = 0;
            row.roleList.forEach(element => {

              if(key == row.roleList.length-1 && element.roleName != undefined)
                dataToReturn += element.roleName
              else if(element.roleName != undefined)
                dataToReturn += element.roleName + ', '

              key++
            });

            return dataToReturn
          }
        }, {
          data: 'grade.gradeName',
          render: function (data, type, row) {
            return '<b>'+row.grade.gradeName+'</b><br>' +  row.division.jobFamily.familyCode + ' - ' + row.division.divisionCode }
        }, {
          data: 'status',
        }, {
          data: 'anothercolumn',
          orderable : false,
          searchable : false,
          render : (data, type, row) => {
            let newRow = {
              id : row.id,
              fullName: row.fullName,
              accountName: row.accountName
            }
            return `<div class="ui icon mini buttons">\
                      <button data-usrobj='${JSON.stringify(newRow)}' class="ui purple button ul-editbtn"><i class="edit icon"></i></button>\
                      <button data-usrobj='${JSON.stringify(newRow)}' class="ui button ul-infobtn"><i class="info icon"></i></button>\
                      <button data-usrobj='${JSON.stringify(newRow)}' class="ui button ul-trashbtn"><i class="trash icon"></i></button>\
                    </div>`;
                  }
        },],
        select: {
          style:    'multi', selector: 'td:first-child .checkbox', info: false
        },
        order: [[ 1, 'asc' ]],
        createdRow: function( row, data, dataIndex ) {
          $(row).attr('id', data.id);
        },
    });

    this.userDT = _userDT;
    //Edit
    $(document).on('click', '.ul-editbtn', function() {
      let usrObj = $(this).data('usrobj');
      that.router.navigate(['/users/edit', usrObj.id]);
    });

    //Detail
    $(document).on('click', '.ul-infobtn', function() {
      let usrObj = $(this).data('usrobj');
      that.router.navigate(['/users/detail', usrObj.id]);
    });

    //Delete
    $(document).on('click', '.ul-trashbtn', function() {
      let usrObj = $(this).data('usrobj');
      that._alertService.setAlert({
        closable: false,
        header : {
          // pot lan
          type: 'pot',
          color: 'red',
          icon: 'user delete',
          text: 'Delete Confirmation',
          subheader: 'Delete user with name ' + usrObj.fullName + ' (<strong>mitrais\\' + usrObj.accountName +'</strong>)'
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

          that._userService.delete({"userID" : [usrObj.id], "actionBy": that._userService.getCurrentUserName()}).subscribe(response => {
            that.userDT.ajax.reload(null, false);
          })

        },
        onDeny: ($element) => {}

      });
    });

    // CheckBox
    _userDT.on( 'select', ( e, dt, type, indexes ) => {
      if ( type === 'row' ) {
        var data = _userDT.rows( indexes ).data().pluck( 'id' );
        for(let i = 0 ; i < data.length ; i++) {
          var id = data[i];
          $('tr[id='+id+']').find('.checkbox').checkbox('check');

          if($.inArray(id, this.userDTSelected) === -1)
            this.userDTSelected.push( id );

          var index = $.inArray(id, this.userDTUnSelected);
          if(index !== -1)
            this.userDTUnSelected.splice(index, 1);

        }
      }
      this.updateButton();

    }).on('deselect', (e, dt, type, indexes) => {
      var data = _userDT.rows( indexes ).data().pluck( 'id' );
      for(let i = 0 ; i < data.length ; i++) {
        var id = data[i];
        $('tr[id='+id+']').find('.checkbox').checkbox('uncheck');

        if($.inArray(id, this.userDTUnSelected) === -1)
          this.userDTUnSelected.push( id );

        var index = $.inArray(id, this.userDTSelected);
        if(index !== -1)
          this.userDTSelected.splice( index, 1 );
      }
      this.updateButton();
    });

    // create search fungsi
    _userDT.columns().every( function () {
      var that = this;
      $( 'input', this.footer() ).on( 'keyup change', function () {
        if ( that.search() !== this.value ) {
          that.search( this.value ).draw();
        }
      });
    });

    // $('input[name="searchkey"]').on( 'keyup change', function () {
    //   _userDT.search( this.value ).draw();
    // });

    // DT TOOLBAR
    // $('div.tb-toolbar').html('\
    // <div class="ui mini gs-info button">Delete <a class="ui mini red circular label">0</a></div>\
    // <div class="ui mini gs-info button">Delete <a class="ui mini red circular label">0</a></div>\
    // ');
    $('div.tb-toolbar-info').html('<div class="ui buttons">\
    <div class="ui button basic ul-selected no-padding-lf">\</div>\
  </div>');

    //ON DRAW
    _userDT.on( 'draw', () => {
      if($.inArray(this.userDT.page.info().page, this.userDTPages) == -1) {
        // page not visited yet
        this.userDTPages.push(this.userDT.page.info().page);
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

    if(this.userDTSelected.length < 1) {
      selected = 0
      unselected = this.userDT.page.info().recordsTotal
    }
    else if(this.userDTSelected.length > 0) {
      if($('.checkallrow').checkbox('is checked') == 'true,false' && this.userDTPages.length != this.userDT.page.info().pages){
        selected = this.userDT.page.info().recordsTotal - this.userDTUnSelected.length
        unselected = this.userDTUnSelected.length
      } else {
        selected = this.userDTSelected.length
        unselected = this.userDT.page.info().recordsTotal - this.userDTSelected.length
      }
    }
    if(selected == 0) {
      $('.gs-info').addClass('disabled')
    } else {
      $('.gs-info').removeClass('disabled')
    }
    $('.ul-selected').html('Selected <b>'+ selected + ' rows</b> of ' + this.userDT.page.info().recordsTotal + ' entries');
    $('.gs-info .label').html(selected)
  }

  drawChecked(): void {
    this.userDT.rows( ( idx, data, node ) => {
      if($.inArray(data.id, this.userDTSelected) !== -1)
        return true;
    }).select();

    this.userDT.rows( ( idx, data, node ) => {
      if($.inArray(data.id, this.userDTUnSelected) !== -1)
        return true;
    }).deselect();
  }

  toogleCheckAll(): void {
    if($('.checkallrow').checkbox('is checked') == 'true,false'){
      this.userDT.rows( ( idx, data, node ) => {
          return true;
      }).select();
    } else {
      this.userDT.rows( ( idx, data, node ) => {
        return true;
      }).deselect();
    }
  }

}
