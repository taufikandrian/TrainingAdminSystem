import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert.service';

declare var $:any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  headerType = 'pot'
  header = 'header'
  colorHeader = 'red'
  subheader = 'subheader'
  iconHeader = 'heartbeat'
  fluidBtn = 'fluid'
  sizeBtn = ''
  positionBtn = 'text-center'
  okBtnColor = ''
  okBtnText = 'Ok'
  okBtn = true
  denyBtnText = 'Cancel'
  denyBtnColor = ''
  denyBtn = true
  message = 'message'
  closable = false

  constructor(private _alertService: AlertService,) { }

  ngOnInit() {
    this._alertService.currentContent$.subscribe(data => {
      this.closable = data.closable
      this.headerType   = data.header.type
      this.header       = data.header.text
      this.colorHeader  = data.header.color
      this.subheader    = data.header.subheader
      this.iconHeader   = data.header.icon

      this.message      = data.message

      this.fluidBtn     = data.button.fluid ? data.button.fluidNumber : ''
      this.sizeBtn      = data.button.size
      this.positionBtn  = 'text-' + data.button.position
      this.okBtn        = data.button.ok.display
      this.okBtnColor   = data.button.ok.color
      this.okBtnText    = data.button.ok.text

      this.denyBtn      = data.button.deny.display
      this.denyBtnColor = data.button.deny.color
      this.denyBtnText  = data.button.deny.text

      $('#alert-modal')
        .modal({
          closable: this.closable,
          blurring: false,
          onDeny: ($element) => {
            data.onDeny($element);
          },
          onApprove: ($element) => {
            data.onApprove($element);
          },
        })
        .modal('show')
    });
  }

}
