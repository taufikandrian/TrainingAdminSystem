import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private currentContent = new Subject<any>();
  public currentContent$ = this.currentContent.asObservable();

  constructor() { }

  setMessage(contentToBoradcast: any){
    this.currentContent.next(contentToBoradcast);
  }

}
