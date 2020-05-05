import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ServerResult, PageList } from '../../dto/system/server-result';
import { User } from '../../dto/system/user';
import { Role } from '../../dto/system/role';
import { UserMenu } from '../../dto/system/menu';

//用户数据服务
@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = `/user`;

  constructor(
    private http: HttpService
  ) { }

  login(userName: string, password: string) {
    return this.http.postForm<ServerResult<string>>(`${this.userUrl}/login`, { userName: userName, password: password });
  }

  logout() {
    return this.http.post<ServerResult<string>>(`${this.userUrl}/logout`,null);
  }

  getUserList(pageIndex: number, pageSize: number, userName: string) {
    return this.http.postForm<ServerResult<PageList<User>>>(`${this.userUrl}/getUserList`,
      { userName: userName, pageIndex: pageIndex, pageSize: pageSize });
  }

  addUser(user: User) {
    return this.http.post<ServerResult<number>>(`${this.userUrl}/addUser`, user);
  }

  updateUser(user: User) {
    return this.http.post<ServerResult<number>>(`${this.userUrl}/updateUser`, user);
  }

  getUserRoleList(userId: number) {
    return this.http.postForm<ServerResult<Role[]>>(`${this.userUrl}/getUserRoleList`, { userId: userId });
  }

  getUserMenuList(userId: number) {
    return this.http.postForm<ServerResult<UserMenu[]>>(`${this.userUrl}/getUserMenuList`, { userId: userId });
  }

  setUserRole(userId: number, roleIdList: number[]) {
    return this.http.postForm<ServerResult<number>>(`${this.userUrl}/setUserRole`, { userId: userId, roleIdList: roleIdList });
  }
}
