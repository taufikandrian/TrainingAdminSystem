import { Component, OnInit, AfterViewChecked, AfterViewInit, ElementRef } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { MenuService } from '../../../services/menu.service';
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewChecked, AfterViewInit {
  public menuItems: any[];
  private isVisible = true;

  constructor(
    private _sidebarService: SidebarService,
    private _menuService: MenuService) {
      this._menuService.currentRoute$.subscribe(data => {
        if(this._menuService.hiddenSidebarForRoute.indexOf(data) >= 0) {
          this.isVisible = false;
        } else {
          this.menuItems = this._sidebarService.getActiveMenu();
          this.isVisible = true;
        }
      });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {}

  ngAfterViewChecked() {}

  openSidebar() {
    this._sidebarService.toogle();
  }
}
