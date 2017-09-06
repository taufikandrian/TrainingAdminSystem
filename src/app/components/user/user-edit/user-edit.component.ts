import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var swal: any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  ngOnInit() : void {
    $('.ui.dropdown').dropdown();
  }

}
