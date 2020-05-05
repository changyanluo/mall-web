import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../service/system/message.service';
import { ServerLog } from '../../../dto/system/log';
import { PageList } from '../../../dto/system/server-result';
import { CommonService } from '../../../service/system/common.service';

//日志列表
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {

  userName: string;
  actionName: string;
  dataList = new PageList<ServerLog>();

  constructor(public commonService: CommonService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.dataList.pageSize = 6;
    this.search();
  }

  search() {
    this.commonService.isLoading = true;
    this.message.getOperationLog(this.dataList.pageIndex, this.dataList.pageSize,this.userName || '', this.actionName || '').subscribe(res => {
      this.commonService.isLoading = false;
      this.dataList.list = res.data.list;
      this.dataList.total = res.data.total;
    })
  }
}
