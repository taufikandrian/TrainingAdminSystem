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
  @Output() uploadCheckAll: EventEmitter<any> = new EventEmitter();
  private userDT: any;
  private userDTSelected = [];
  constructor(private router: Router,
              private _dtService: DatatableService,
              private _alertService: AlertService,
              private _userService: UserService,
              private _sidebarService: SidebarService,
              private _menuService: MenuService,) { window["my_unique_class_name"]=this; }

  ngOnInit() {
    this._sidebarService.hide();
    this._menuService.setCurrentHeader({
      icon  : 'users',
      main  : 'User List',
      sub   : 'List all users in Database',
      size  : 'large'
    });
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
                <"ui left floated segment basic no-margin no-padding"i>\
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
        orderMulti: false,
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
          data: 'fullName'
        }, {
          data: 'email'
        }, {
          data: 'status'
        }, {
          data: 'anothercolumn',
          orderable : false,
          searchable : false,
          render : (data, type, row) => {
            return `<div class="ui icon mini buttons">\
                      <button data-usrobj='${JSON.stringify(row)}' class="ui purple button editbtn"><i class="edit icon"></i></button>\
                      <button data-usrobj="${JSON.stringify(row)}" class="ui button infobtn"><i class="info icon"></i></button>\
                      <button data-usrobj='${JSON.stringify(row)}' class="ui button trashbtn"><i class="trash icon"></i></button>\
                    </div>`;
                  }
        },],
        select: {
          style:    'multi', selector: 'td:first-child .checkbox'
        },
        order: [[ 1, 'asc' ]],
        createdRow: function( row, data, dataIndex ) {
          $(row).attr('id', data.id);
        },
        drawCallback: function (settings, json) {
          this.api().rows( ( idx, data, node ) => {
            if ( $.inArray(data.id, this.userDTSelected) !== -1 ) {
              return true;
            }
          }).select();

        }
    });
    var that = this;

    //Edit
    $(document).on('click', '.editbtn', function() {
      let usrObj = $(this).data('usrobj');
      that.router.navigate(['/users/edit', usrObj.id]);
    });

    //Detail
    $(document).on('click', '.infobtn', function() {
      let usrObj = $(this).data('usrobj');
      that.router.navigate(['/users/edit', usrObj.id]);
    });

    //Delete
    $(document).on('click', '.trashbtn', function() {
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

          that._userService.delete({"userID" : [usrObj.id]}).subscribe(response => {
            that.userDT.ajax.reload(null, false);
          })

        },
        onDeny: ($element) => {}

      });
      // that.router.navigate(['/users/edit', $(this).data('id')]);
    });

    // CheckBox
    _userDT.on( 'select', ( e, dt, type, indexes ) => {
      if ( type === 'row' ) {
        var data = _userDT.rows( indexes ).data().pluck( 'id' );
        for(let i = 0 ; i < data.length ; i++) {
          var id = data[i];
          $('tr[id='+id+']').find('.checkbox').checkbox('check');
          var index = $.inArray(id, this.userDTSelected);
          if ( index === -1 ) {
              this.userDTSelected.push( id );
          }
        }
      }
    }).on('deselect', (e, dt, type, indexes) => {
      var data = _userDT.rows( indexes ).data().pluck( 'id' );

      for(let i = 0 ; i < data.length ; i++) {
        var id = data[i];
        $('tr[id='+id+']').find('.checkbox').checkbox('uncheck');
        var index = $.inArray(id, this.userDTSelected);
        if ( index === -1 ) {
          this.userDTSelected.push( id );
        } else {
          this.userDTSelected.splice( index, 1 );
        }
      }
    });

    // create search fungsi
    _userDT.column().every( function () {
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


    this.userDT = _userDT;
    // $('div.tb-toolbar').html('<div class="ui tiny buttons">\
    //                             <button class="ui button" onclick="my_unique_class_name.tes("adfa")">\
    //                               <i class="icon add user"></i>\
    //                               Pause\
    //                             </button>\
    //                           </div>');
    this.userDT.on( 'draw', () => {
      this.checkAll();
    });
  }

  setCheckAllrow(bool): void {
    $('.checkallrow').checkbox('uncheck');
  }

  checkAll(): void {

    if($('.checkallrow').checkbox('is checked') == 'true,false'){
      this.userDT.rows( function ( idx, data, node ) {
        return true;
      }).select();
    } else {
      this.userDT.rows( function ( idx, data, node ) {
        return true;
      }).deselect();
    }
  }

}
