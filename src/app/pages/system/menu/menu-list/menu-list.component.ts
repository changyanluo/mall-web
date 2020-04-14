import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../../service/system/menu.service';
import { Menu, UserMenu } from '../../../../dto/system/menu';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MenuEntryComponent } from '../menu-entry/menu-entry.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.less']
})
export class MenuListComponent implements OnInit {

  menuName = '';
  menuList: UserMenu[];
  openStatus: Map<number, boolean> = new Map<number, boolean>(); //保存菜单的展开状态<序号，是否展开>

  constructor(private menuService: MenuService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.menuService.getMenuList(this.menuName)
      .subscribe(res => {
        this.menuList = res.data;
        this.setExpandStatus(this.menuList);
      });
  }

  collapse(menu: UserMenu, event: boolean): void {
    menu.expand = event;
    this.openStatus.set(menu.id, event);
  }

  setExpandStatus(menus: UserMenu[]) {
    for (let menu of menus) {
      if (this.openStatus.has(menu.id)) {
        menu.expand = this.openStatus.get(menu.id);
      }
      if (menu.children.length > 0) {
        this.setExpandStatus(menu.children);
      }
    }
  }

  addMenu(parentId?: number, level?: number) {
    const menu: Menu = {
      id: null,
      menuName: '',
      parentId: parentId,
      url: '',
      icon: '',
      createTime: null,
      level: level ? level + 1 : 1,
      description: '',
      status: 1
    }
    const modal = this.modalService.create({
      nzTitle: '新增菜单',
      nzContent: MenuEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { menu: menu },
      nzFooter:null
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }

  editMenu(selectedMenu: Menu) {
    const modal = this.modalService.create({
      nzTitle: '修改菜单',
      nzContent: MenuEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { menu: JSON.parse(JSON.stringify(selectedMenu)) },
      nzFooter: null
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }
}
