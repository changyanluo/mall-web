import { Component, OnInit ,OnDestroy} from '@angular/core';
import { MessageService } from '../../../../../service/system/message.service';
import { UserMessage } from '../../../../../dto/system/user-message';
import { NzNotificationService } from 'ng-zorro-antd';

/*顶部消息通知组件
登录时从数据库拉取未读消息，使用时接受webSocket推送消息
*/
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit,OnDestroy{

  messages: UserMessage[] = [];//消息列表

  constructor(private notification: NzNotificationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.openWsConnection();
    this.messageService.messageReceived.subscribe(ev => {
      const newMsg: UserMessage = JSON.parse(ev.data);
      this.messages.push(newMsg);
      this.notification.info(newMsg.title,newMsg.content);
    });
    this.messageService.getUserMessageList().subscribe(res => {
      this.messages = [];
      for (let msg of res.data) {
        const messageItem: UserMessage = {
          content: msg.content,
          title: msg.title
        };
        this.messages.push(messageItem);
      }
    });
  }

  //页面销毁时释放webSocket连接
  ngOnDestroy(){
    this.messageService.closeConnection();
  }
}
