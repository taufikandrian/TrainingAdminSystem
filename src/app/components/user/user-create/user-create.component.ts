import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var swal: any;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.ui.dropdown').dropdown();
  }

}
