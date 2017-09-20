import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { DatatableService } from '../../../services/datatable.service';

import { Environment } from '../../../classes/environment';

declare var $:any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private router: Router,
              private _dtService: DatatableService,) { }

  ngOnInit() {
    this._dtService.setTableName('.table-usertable');
    this._dtService.setDtHeight(false);
    this._dtService.setAjaxSetup({
      contentType: 'application/json',
      url: Environment.apiUrl+'/data/users',
      type: 'POST',
      data: (d) => {
        return JSON.stringify(d);
      }
    });
    this._dtService.setColumns([
      {
        data: 'accountName',
        render: function (data, type, row) {
          return '<strong>mitrais\\' + data + '</strong>' || '';
        }
      },
      {
        data: 'fullName'
      },
      {
        data: 'email'
      },
      {
        data: 'status'
      },
      {
        data: 'anothercolumn',
        orderable : false,
        searchable : false,
        render : (data, type, row) => {
          return '<div class="ui icon mini buttons">\
                    <button class="ui blue button"><i class="edit icon"></i></button>\
                    <button class="ui button"><i class="info icon"></i></button>\
                    <button class="ui red button"><i class="trash icon"></i></button>\
                  </div>';
        }
      },
    ]);

    let table = this._dtService.build();
  }

}
