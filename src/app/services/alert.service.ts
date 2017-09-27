import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

declare var swal: any;

@Injectable()
export class AlertService {
  private currentContent = new Subject<any>();
  public currentContent$ = this.currentContent.asObservable();

  constructor() { }

  setAlert(contentToBoradcast: any){
    this.currentContent.next(contentToBoradcast);
  }

  buildAlertError(message) {
    this.currentContent.next({
      closable: true,
      header : {
        // pot lan
        type: 'lan',
        color: 'red',
        icon: 'warning sign',
        text: 'Opps!',
        subheader: 'Sorry, something get an error'
      },
      message: message,
      button : {
        size: '',
        position: 'center',
        fluid: true,
        fluidNumber: 'two',
        ok : {display: true,text: 'Ok',color: ''},
        deny : {display : false,text: 'Cancel',color: ''}
      },
      onApprove : ($element) => {
        // this.logout();
      },
      onDeny: ($element) => {}
    })
  }

  // showError(message): void{
  //   swal({
  //     title: 'Opps!',
  //     html: '<h2 class="ui header">\
  //             <div class="sub header">'+message+'</div>\
  //           </h2>',
  //     type: 'error',
  //     width: 300,
  //     buttonsStyling: false,
  //     confirmButtonText: 'Oke!',
  //     confirmButtonClass: 'ui button',
  //     // title: 'Opps!',
  //     // text: result.json().message,
  //     // type: 'error',
  //     // width: 300,
  //   });
  // }
}
