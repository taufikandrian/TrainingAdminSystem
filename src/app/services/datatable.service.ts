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

  build(setCheckAllrow): any {
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
        // dom: '<"toolbar">frtip',
        dom: '<"ui clearing basic segment no-padding"\
                <"ui left floated segment basic no-margin no-padding" <"tb-toolbar">>\
                <"ui right floated segment basic no-margin no-padding"l>\
              >\
              <tr>\
              <"ui clearing basic segment no-padding"\
                <"ui left floated segment basic no-margin no-padding"p>\
                <"ui right floated segment basic no-margin no-padding"p>\
              >',
        ajax: this.ajaxSetup,
        orderMulti: false,
        columns: this.columns,

        select: {
          style:    'multi',
          // info: false,
          selector: 'td:first-child .checkbox'
        },
        order: [[ 1, 'asc' ]],
        createdRow: function( row, data, dataIndex ) {
          $(row).attr('id', data.id);
        },
        drawCallback: function(settings, json) {
          this.api().rows( function ( idx, data, node ) {
            if ( $.inArray(data.id, selected) !== -1 ) {
              return true;
            }
          }).select();

        }
    });

    table.on( 'select', ( e, dt, type, indexes ) => {
      if ( type === 'row' ) {
        var data = table.rows( indexes ).data().pluck( 'id' );
        for(let i = 0 ; i < data.length ; i++) {
          var id = data[i];
          $('tr[id='+id+']').find('.checkbox').checkbox('check');
          var index = $.inArray(id, selected);
          if ( index === -1 ) {
              selected.push( id );
          }
        }
      }
    }).on('deselect', (e, dt, type, indexes) => {
      setCheckAllrow(false);
      var data = table.rows( indexes ).data().pluck( 'id' );

      for(let i = 0 ; i < data.length ; i++) {
        var id = data[i];
        $('tr[id='+id+']').find('.checkbox').checkbox('uncheck');
        var index = $.inArray(id, selected);
        if ( index === -1 ) {
          selected.push( id );
        } else {
          selected.splice( index, 1 );
        }
      }
    });

    // create search fungsi
    table.column().every( function () {
      var that = this;
      $( 'input', this.footer() ).on( 'keyup change', function () {
        if ( that.search() !== this.value ) {
          that.search( this.value ).draw();
        }
      });
    });

    $('input[name="searchkey"]').on( 'keyup change', function () {
      table.search( this.value ).draw();
    });

    return table;
  }

}
