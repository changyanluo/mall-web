import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/system/user.service';
import { RoleService } from '../../../../service/system/role.service';
import { User } from '../../../../dto/system/user';
import { Role } from '../../../../dto/system/role';
import { PageList } from '../../../../dto/system/server-result';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserEntryComponent } from '../user-entry/user-entry.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {

  userName = '';
  dataList = new PageList();
  roleIdList: number[];
  roleOptions: Role[];

  constructor(private userService: UserService,
    private roleService: RoleService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.userService.getUserList(this.dataList.pageIndex, this.dataList.pageSize, this.userName)
      .subscribe(res => {
        this.dataList.list = res.data.list;
        this.dataList.total = res.data.total;
      });
  }

  addUser() {
    const user: User = {
      id: null,
      userName: '',
      password: '',
      phoneNumber: '',
      email: '',
      icon: '',
      createTime: null,
      description: '',
      status: 1
    }
    const modal = this.modalService.create({
      nzTitle: '新增用户',
      nzContent: UserEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { user: user },
      nzFooter: [{
        label: '保存',
        type: 'primary',
        onClick: (instance: any) => instance.save()
      }
      ]
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }

  editUser(selectedUser: User) {
    const modal = this.modalService.create({
      nzTitle: '修改用户信息',
      nzContent: UserEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { user: JSON.parse(JSON.stringify(selectedUser)) },
      nzFooter: [{
        label: '保存',
        type: 'primary',
        onClick: (instance: any) => instance.save()
      }]
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }

  //设置用户角色
  setRole(userId: number) {
    if (!this.roleOptions) {
      this.roleService.getAllRole('').subscribe(res => {
        this.roleOptions = res.data;
      })
    }
  }

  private createModal(title: string) {
    this.modalService.create({
      nzTitle: '修改用户信息',
      nzContent: UserEntryComponent,
      nzClosable: false,
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: (instance) => { return instance.save() }
    });
  }
}
