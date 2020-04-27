import { Component, OnInit } from '@angular/core';
import { User } from '../../../../dto/system/user';
import { UserService } from '../../../../service/system/user.service';
import { CommonService } from '../../../../service/system/common.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

//用户录入界面
@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.less']
})
export class UserEntryComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
    private modal: NzModalRef,
    public commonService: CommonService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  save() {
    if (this.commonService.stringEmpty(this.user.userName)) {
      this.messageService.error('请输入用户名！');
      return;
    }
    if (this.commonService.stringEmpty(this.user.password)) {
      this.messageService.error('请输入密码！');
      return;
    }
    this.commonService.isLoading = true;
    if (!this.user.id) {
      this.userService.addUser(this.user).subscribe(() => {
        this.commonService.isLoading = false;
        this.messageService.success('新增成功!');
        this.modal.destroy(true);
      }
      );
    }
    else {
      this.userService.updateUser(this.user).subscribe(() => {
        this.commonService.isLoading = false;
        this.messageService.success('修改成功!');
        this.modal.destroy(true);
      });
    }
  }
}
