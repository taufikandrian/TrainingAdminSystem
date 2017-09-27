import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd }            from '@angular/router';
import { MenuService } from '../../services/menu.service';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  private previousUrl = '/'
  constructor(private router: Router,
              private _menuService: MenuService,) {

  }

  ngOnInit() {
    this._menuService.setCurrentRoute(this.router.url, false);
  }

  toPrev() {
    this.router.navigate([this.previousUrl]);
  }

}
