import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/system/user.service'
import { UserMenu } from '../../../dto/system/menu';
import { NzMessageService } from 'ng-zorro-antd';

//admin左侧菜单布局
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.less']
})
export class LeftMenuComponent implements OnInit {

  isCollapsed = false;
  menus: UserMenu[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserMenuList(1).subscribe(res => {
      if (res.code == 1) {
        this.menus = res.data;
      }
    });
  }
}