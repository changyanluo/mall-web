import { Injectable } from '@angular/core';
import { ServerResult, PageList } from '../../dto/system/server-result';
import { HttpService } from './http.service';
import { UserMenu, Menu } from '../../dto/system/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuUrl = `/menu`;

  constructor(private http: HttpService) { }

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
