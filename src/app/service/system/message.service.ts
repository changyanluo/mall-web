import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';
import { SysMessage } from '../../dto/system/sys-message';
import { ServerResult, PageList } from '../../dto/system/server-result';
import { ServerLog } from '../../dto/system/log';

//消息数据服务
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  wsUrl = environment.wsUrl + "/webSocket";
  ws: WebSocket;
  messageReceived: Subject<MessageEvent> = new Subject<MessageEvent>();//接受消息Observer
  constructor(private messageService: NzMessageService,
    private http: HttpService) { }

  //开启websocket连接
  openWsConnection() {
    this.ws = new WebSocket(this.wsUrl + "?token=" + sessionStorage.getItem("token"));
    const self = this;
    this.ws.onerror = function (ev: Event) {
      self.messageService.error('webSocket出错!');
    }
    this.ws.onmessage = function (ev: MessageEvent) {
      self.messageReceived.next(ev);
    }
  }

  //获取用户消息列表
  getUserMessageList() {
    const userName = sessionStorage.getItem("userName");
    return this.http.postForm<ServerResult<SysMessage[]>>("/user/getUserMessage",
      { userName: userName });
  }

  //获取用户操作日志
  getOperationLog(pageIndex: number, pageSize: number, userName: string, actionName: string) {
    return this.http.postForm<ServerResult<PageList<ServerLog>>>("/user/getOperationLog",
      { userName: userName, actionName: actionName, pageIndex: pageIndex, pageSize: pageSize });
  }

  closeConnection() {
    this.ws.close();
  }
}
