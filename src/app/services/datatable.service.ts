import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

declare var $:any;
declare var swal: any;

@Injectable()
export class DatatableService {
  private tableName;
  private ajaxSetup;
  private columns;
  private dtHeight;
  constructor(private http: Http) { }

  setTableName(tableName) {
    this.tableName = tableName;
  }

  setAjaxSetup(setup) {
    this.ajaxSetup = setup;
  }

  setColumns(columns) {
    this.columns = columns;
  }

  setDtHeight(value) {
    this.dtHeight = value;
  }

  build(): any {
    // crear seach box
    $(this.tableName+' tfoot th').each( function () {
      var title = $(this).text();
      if($(this).hasClass('disabled'))
        $(this).html( '<div class="ui small fluid input disabled"><input type="text" placeholder="Disabled" /></div>' );
      else
      $(this).html( '<div class="ui small fluid input"><input type="text" placeholder="Search by '+title.toLowerCase()+' ..." /></div>' );
    });
    var selected = [];
    // create table
    var table = $(this.tableName)
      .on( 'processing.dt', ( e, settings, processing ) => {
        if(processing)
          $(this.tableName).closest('.dimmable').find('.dimmer').addClass('active');
        else
          $(this.tableName).closest('.dimmable').find('.dimmer').removeClass('active');
      })
      .DataTable( {
        responsive  : true,
        scrollY     : this.dtHeight,
        deferRender : true,
        processing  : true,
        serverSide  : true,
        dom: '<"ui segment"l> <tr> <"ui segment center aligned"p>',
        ajax: this.ajaxSetup,
        orderMulti: false,
        columns: this.columns,
        createdRow: function( row, data, dataIndex ) {
          $(row).attr('id', data.id);
        },
        rowCallback: function( row, data ) {
          if ( $.inArray(data.id, selected) !== -1 ) {
              $(row).addClass('selected');
          }
        }
    });

    $(this.tableName+' tbody').on('click', 'tr', function () {
      var id = this.id;
      var index = $.inArray(id, selected);

      if ( index === -1 ) {
          selected.push( id );
      } else {
          selected.splice( index, 1 );
      }

      $(this).toggleClass('selected');
    });

    // create search fungsi
    table.columns().every( function () {
      var that = this;
      $( 'input', this.footer() ).on( 'keyup change', function () {
        if ( that.search() !== this.value ) {
          that.search( this.value ).draw();
        }
      });
    });

    return table;
  }

}
