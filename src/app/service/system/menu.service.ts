import { Injectable } from '@angular/core';
import { ServerResult, PageList } from '../../dto/system/server-result';
import { HttpService } from './http.service';
import { UserMenu, Menu } from '../../dto/system/menu';

//菜单数据服务
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuUrl = `/menu`;

  constructor(private http: HttpService) { }

  //获取树形菜单数据
  getMenuList(menuName?: string) {
    return this.http.postForm<ServerResult<UserMenu[]>>(`${this.menuUrl}/getMenuList`,
      { menuName: menuName });
  }

  addMenu(menu: Menu) {
    return this.http.post<ServerResult<number>>(`${this.menuUrl}/addMenu`, menu);
  }

  updateMenu(menu: Menu) {
    return this.http.post<ServerResult<number>>(`${this.menuUrl}/updateMenu`, menu);
  }
}
