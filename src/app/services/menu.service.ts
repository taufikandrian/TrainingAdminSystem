import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class MenuService {
  private currentRoute = new Subject<any>();
  public currentRoute$ = this.currentRoute.asObservable();

  private currentHeader = new Subject<any>();
  public currentHeader$ = this.currentHeader.asObservable();

  private currentBread = new Subject<any>();
  public currentBread$ = this.currentBread.asObservable();

  public hiddenSidebarForRoute = ['/role', '/login'];
  constructor() { }

  setCurrentRoute(dataRoute: string, bool = true){
    this.currentRoute.next([dataRoute, bool]);
  }

  setCurrentBread(dataBread: any) {
    this.currentBread.next(dataBread);
  }

  setCurrentHeader(dataHeader: any) {
    this.currentHeader.next(dataHeader);
  }
}
