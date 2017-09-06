import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $('.table-usertable').DataTable();
  }

}
