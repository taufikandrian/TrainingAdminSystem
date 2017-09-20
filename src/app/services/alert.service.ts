import { Injectable } from '@angular/core';

declare var swal: any;

@Injectable()
export class AlertService {

  constructor() { }

  showError(message): void{
    swal({
      title: 'Opps!',
      html: '<h2 class="ui header">\
              <div class="sub header">'+message+'</div>\
            </h2>',
      type: 'error',
      width: 300,
      buttonsStyling: false,
      confirmButtonText: 'Oke!',
      confirmButtonClass: 'ui button',
      // title: 'Opps!',
      // text: result.json().message,
      // type: 'error',
      // width: 300,
    });
  }
}
