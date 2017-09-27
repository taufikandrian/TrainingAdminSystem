import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }            from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SidebarService } from '../../../services/sidebar.service';
import { MenuService } from '../../../services/menu.service';
import { User } from '../../../classes/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private isLoading = true;
  private curUser: User;
  constructor(private route: ActivatedRoute,
              private _userService: UserService,
              private _menuService: MenuService,
              private _sidebarService: SidebarService,) { }

  ngOnInit() {
    this._sidebarService.hide();
    this._menuService.setCurrentHeader({
      icon  : 'user',
      main  : 'Detail',
      sub   : '',
      size  : 'large',
      visible: false,
    });
    this.route.params.subscribe(params => {
      this._userService.detail(params['id']).subscribe(response => {
        let user : User;
        user = response.json().data.Get_User;

        this.curUser = user;

        this.isLoading = false
      })
    })
  }

}
