import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../../../service/system/user.service';
import { RoleService } from '../../../../service/system/role.service';
import { CommonService } from '../../../../service/system/common.service';
import { User } from '../../../../dto/system/user';
import { Role } from '../../../../dto/system/role';
import { PageList } from '../../../../dto/system/server-result';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd';
import { UserEntryComponent } from '../user-entry/user-entry.component';
import { forkJoin } from 'rxjs';

//用户列表界面
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {

  userName = '';
  dataList = new PageList<User>();
  roleIdList: number[];
  roleOptions: Role[];

  selectedUserId: number;
  isVisible = false;

  constructor(private userService: UserService,
    private roleService: RoleService,
    private messageService: NzMessageService,
    public commonService: CommonService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.commonService.isLoading = true;
    this.userService.getUserList(this.dataList.pageIndex, this.dataList.pageSize, this.userName)
      .subscribe(res => {
        this.commonService.isLoading = false;
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
      nzFooter: null
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
      nzFooter: null
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }

  //设置用户角色
  setRole(userId: number) {
    this.roleIdList = [];
    this.selectedUserId = userId;
    //获取所有角色和该用户已有角色
    forkJoin([this.roleService.getAllRole(''), this.userService.getUserRoleList(userId)])
      .subscribe(res => {
        this.roleOptions = res[0].data;
        for (let role of res[1].data) this.roleIdList.push(role.id);
        this.isVisible = true;
      });
  }

  save() {
    this.commonService.isLoading = true;
    this.userService.setUserRole(this.selectedUserId, this.roleIdList).subscribe(() => {
      this.commonService.isLoading = false;
      this.messageService.success('设置成功!');
      this.isVisible = false;
    })
  }
}
