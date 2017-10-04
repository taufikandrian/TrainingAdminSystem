import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private isVisible = true;

  constructor(private _menuService: MenuService,) { }

  ngOnInit() {
    this._menuService.currentRoute$.subscribe(data => {

            if(this._menuService.hiddenSidebarForRoute.indexOf(data[0]) >= 0) {
              this.isVisible = false;
            } else {
              this.isVisible = true;
            }
            if(!data[1])
              this.isVisible = false;
          });
  }

}
