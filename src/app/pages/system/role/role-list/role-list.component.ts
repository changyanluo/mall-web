import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Role } from '../../../../dto/system/role';
import { PageList } from '../../../../dto/system/server-result';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleEntryComponent } from '../role-entry/role-entry.component';
import { RoleService } from '../../../../service/system/role.service';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { NzMessageService } from 'ng-zorro-antd';
import { Menu, UserMenu } from '../../../../dto/system/menu';
import { MenuService } from '../../../../service/system/menu.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.less']
})
export class RoleListComponent implements OnInit {

  @ViewChild('menuTreeComponent') menuTreeComponent: NzTreeComponent;
  roleName = '';
  dataList = new PageList();
  menuList: UserMenu[];
  nodes: NzTreeNodeOptions[];
  SelectedKeys: string[];
  roleMenuIds: number[];

  constructor(private roleService: RoleService,
    private menuService: MenuService,
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

  //给角色配置菜单
  setMenu(roleId: number, template: TemplateRef<{}>) {
    forkJoin(this.roleService.getRoleMenuList(roleId), this.menuService.getMenuList(''))
      .subscribe(res => {
        this.SelectedKeys = [];
        for (let roleMenu of res[0].data) {
          this.SelectedKeys.push(roleMenu.id.toString());
        }
        this.nodes = this.convertNode(res[1].data);
        const modal = this.modalService.create({
          nzTitle: '设置角色菜单',
          nzContent: template,
          nzMaskClosable: false,
          nzFooter: [{
            label: '保存',
            type: 'primary',
            onClick: () => {
              let selIds: string[] = [];
              for (let node of this.menuTreeComponent.getCheckedNodeList()) {
                selIds.push(node.key);
              }

            }
          }]
        });
      });
  }

  getSelMenuId() {
    for (let node of this.nodes) {
      
    }
  }

  //判断某个结点是否有子节点被选中
  hasChildSelected(node: NzTreeNodeOptions, selKeys: string[]): boolean {
    for (let childNode of node.children) {
      if (selKeys.indexOf(childNode.key) > -1 || this.hasChildSelected(childNode, selKeys)) {
        return true;
      }
    }
    return false;
  }

  //将后台菜单数据转化为控件数据
  convertNode(userMenu: UserMenu[]) {
    let nodes = [];
    for (let item of userMenu) {
      let node: NzTreeNodeOptions = {
        key: item.id.toString(),
        title: item.menuName,
      };
      if (item.children.length > 0) {
        node.children = this.convertNode(item.children);
        if (this.SelectedKeys.indexOf(node.key) > -1) node.expanded = true;
      }
      else {
        node.isLeaf = true;
        if (this.SelectedKeys.indexOf(node.key) > -1) node.checked = true;
      }
      nodes.push(node);
    }
    return nodes;
  }
}
