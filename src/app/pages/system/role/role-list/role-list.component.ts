import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../../dto/system/role';
import { PageList } from '../../../../dto/system/server-result';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleEntryComponent } from '../role-entry/role-entry.component';
import { RoleService } from '../../../../service/system/role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuService } from '../../../../service/system/menu.service';
import { TreeSelectComponent } from '../../../../shared/components/tree-select/tree-select.component';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../../../service/system/common.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.less']
})
export class RoleListComponent implements OnInit {

  roleName = '';
  dataList = new PageList();

  constructor(private roleService: RoleService,
    private menuService: MenuService,
    public commonService: CommonService,
    private messageService: NzMessageService,
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
      nzFooter: null
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }

  //给角色配置菜单
  setMenu(roleId: number) {
    this.commonService.isLoading = true;
    forkJoin(this.roleService.getRoleMenuList(roleId), this.menuService.getMenuList(''))
      .subscribe(res => {
        this.commonService.isLoading = false;
        let SelectedKeys = [];
        for (let roleMenu of res[0].data) {
          SelectedKeys.push(roleMenu.id.toString());
        }
        const modal = this.modalService.create({
          nzTitle: '设置角色菜单',
          nzContent: TreeSelectComponent,
          nzComponentParams: { initList: res[1].data, titleAttr: 'menuName', initSelectedKeys: SelectedKeys },
          nzMaskClosable: false,
          nzFooter: [{
            label: '保存',
            type: 'primary',
            onClick: (instance) => {
              const selectMenuIds = instance.getSelectedIds();
              this.roleService.setRoleMenu(roleId, selectMenuIds)
                .subscribe(res => {
                  this.messageService.success('设置成功！');
                  modal.destroy();
                })
            }
          }]
        });
      });
  }
}
