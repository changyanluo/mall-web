import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../../service/system/menu.service';
import { Menu } from '../../../../dto/system/menu';
import { CommonService } from '../../../../service/system/common.service';
import { NzMessageService , NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrls: ['./menu-entry.component.less']
})
export class MenuEntryComponent implements OnInit {

  menu:Menu;

  constructor(private menuService: MenuService,
    public commonService: CommonService,
    private modal: NzModalRef,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  save() {
    if (this.commonService.stringEmpty(this.menu.menuName)) {
      this.messageService.error('请输入菜单名！');
      return false;
    }
    if (this.commonService.stringEmpty(this.menu.url)) {
      this.messageService.error('请输入地址！');
      return false;
    }
    this.commonService.isLoading = true;
    if (!this.menu.id) {
      this.menuService.addMenu(this.menu).subscribe(() => {
        this.commonService.isLoading = false;
        this.messageService.success('新增成功!');
        this.modal.destroy(true);
      });
    }
    else {
      this.menuService.updateMenu(this.menu).subscribe(() => {
        this.commonService.isLoading = false;
        this.messageService.success('修改成功!');
        this.modal.destroy(true);
      });
    }
    return true;
  }
}
