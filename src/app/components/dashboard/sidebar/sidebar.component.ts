import { Component, OnInit, AfterViewChecked, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute }            from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import { MenuService } from '../../../services/menu.service';
import { AssetService } from '../../../services/asset.service';
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewChecked, AfterViewInit {
  public menuItems: any[];
  private isVisible = true;
  private assets = {};
  constructor(
    private _sidebarService: SidebarService,
    private router: ActivatedRoute,
    private _assetService: AssetService,
    private _menuService: MenuService) {
      this.assets['logo'] = this._assetService.getURL('_logo_tas_texted');
      this._menuService.currentRoute$.subscribe(data => {
        if(this._menuService.hiddenSidebarForRoute.indexOf(data[0]) >= 0) {
          this.isVisible = false;
        } else {
          this.menuItems = this._sidebarService.getActiveMenu();
          this.isVisible = true;
        }
        if(!data[1])
          this.isVisible = false;
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
