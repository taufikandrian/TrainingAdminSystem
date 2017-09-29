import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../services/message.service';

declare var $:any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  private data;
  constructor(private _messageService: MessageService,) { }

  ngOnInit() {
    this._messageService.currentContent$.subscribe(data => {
      this.data = data;
      var that = this
      $(document).on('click', '.message .close', function() {
        that.data = null
      });
    });
  }

}
