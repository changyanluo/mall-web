import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../../environments/environment';

//消息数据服务
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  wsUrl = environment.wsUrl + "/webSocket";
  ws: WebSocket;

  constructor(private messageService: NzMessageService) { }

  //开启websocket连接
  openWsConnection() {
    this.ws = new WebSocket(this.wsUrl + "?token="+ sessionStorage.getItem("token"));
    const self = this;
    this.ws.onopen = function(ev){
      self.messageService.success('连接成功!');
    }
  }
}
