import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/system/user.service';
import { Role } from '../../../../dto/system/role';
import { PageList } from '../../../../dto/system/server-result';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoleEntryComponent } from '../role-entry/role-entry.component';
import { RoleService } from '../../../../service/system/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.less']
})
export class RoleListComponent implements OnInit {

  roleName = '';
  dataList = new PageList();

  constructor(private roleService: RoleService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.roleService.getRoleList(this.dataList.pageIndex, this.dataList.pageSize, this.roleName)
      .subscribe(res => {
        this.dataList.list = res.data.list;
        this.dataList.total = res.data.total;
      });
  }

  addRole() {
    const role: Role = {
      id: null,
      roleName: '',
      createTime: null,
      description: '',
      status: 1
    }
    const modal = this.modalService.create({
      nzTitle: '新增角色',
      nzContent: RoleEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { role: role },
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

  editRole(selectedRole: Role) {
    const modal = this.modalService.create({
      nzTitle: '修改角色信息',
      nzContent: RoleEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { role: JSON.parse(JSON.stringify(selectedRole)) },
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
}
