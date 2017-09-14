import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var swal: any;

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.ui.dropdown').dropdown();
  }

}
