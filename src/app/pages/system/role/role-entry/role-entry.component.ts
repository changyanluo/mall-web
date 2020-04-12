import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../dto/system/role';
import { RoleService } from '../../../../service/system/role.service';
import { CommonService } from '../../../../service/system/common.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-role-entry',
  templateUrl: './role-entry.component.html',
  styleUrls: ['./role-entry.component.less']
})
export class RoleEntryComponent implements OnInit {

  role: Role;

  constructor(private roleService: RoleService,
    public commonService: CommonService,
    private modal: NzModalRef,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  save() {
    if (this.commonService.stringEmpty(this.role.roleName)) {
      this.messageService.error('请输入角色名！');
      return;
    }
    this.commonService.isLoading = true;
    if (!this.role.id) {
      this.roleService.addRole(this.role).subscribe(() => {
        this.commonService.isLoading = false;
        this.messageService.success('新增成功!');
        this.modal.destroy(true);
      });
    }
    else {
      this.roleService.updateRole(this.role).subscribe(() => {
        this.commonService.isLoading = false;
        this.messageService.success('修改成功!');
        this.modal.destroy(true);
      });
    }
  }
}
