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
              private router: Router,
              private _userService: UserService,
              private _menuService: MenuService,
              private _sidebarService: SidebarService,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._userService.detail(params['id']).subscribe(response => {
        let user : User;
        user = response.json().data.Get_User;
        this.curUser = user;
        this.initTopMenu();
        this.isLoading = false
      })
    })
  }

  initTopMenu() {
    this._sidebarService.hide();
    this._menuService.setCurrentRoute(this.router.url);
    this._menuService.setCurrentHeader({
      icon  : 'user',
      main  : 'Detail User',
      sub   : 'Detail user with name <strong>'+ this.curUser.fullName + '</strong>',
      size  : 'large',
      visible: true,
    });
    this._menuService.setCurrentBread({ before : [
      {icon  : 'dashboard', name  : 'Dashboard', route: '/dashboard'},
      {icon  : 'users', name  : 'Users', route: '/users'},
    ], active: {icon  : 'user', name  : 'Detail user'}, });
  }

}
