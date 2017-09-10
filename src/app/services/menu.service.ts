import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class MenuService {
  private currentRoute = new Subject<string>();
  
  public hiddenSidebarForRoute = ['/role', '/login'];
  public currentRoute$ = this.currentRoute.asObservable();
  constructor() { }

  setCurrentRoute(textToPublish: string){
    this.currentRoute.next(textToPublish);
  }
}
