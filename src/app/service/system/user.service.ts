import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ServerResult, PageList } from '../../dto/system/server-result';
import { User } from '../../dto/system/user';
import { Role } from '../../dto/system/role';

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

  setUserRole(userId: number, roleIdList: number[]) {
    return this.http.postForm<ServerResult<number>>(`${this.userUrl}/setUserRole`, { userId: userId, roleIdList: roleIdList });
  }
}
