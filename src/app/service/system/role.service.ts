import { Injectable } from '@angular/core';
import { ServerResult, PageList } from '../../dto/system/server-result';
import { HttpService } from './http.service';
import { Role } from '../../dto/system/role';
import { Menu } from '../../dto/system/menu';
import { Authority } from '../../dto/system/authority';

//角色数据服务
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roleUrl = `/role`;

  constructor(private http: HttpService) { }

  getRoleList(pageIndex: number, pageSize: number, roleName?: string) {
    return this.http.postForm<ServerResult<PageList<Role>>>(`${this.roleUrl}/getRoleList`,
      { roleName: roleName, pageIndex: pageIndex, pageSize: pageSize });
  }

  getAllRole(roleName?: string) {
    return this.http.postForm<ServerResult<Role[]>>(`${this.roleUrl}/getAllRole`,
      { roleName: roleName });
  }

  addRole(role: Role) {
    return this.http.post<ServerResult<PageList<number>>>(`${this.roleUrl}/addRole`, role);
  }

  updateRole(role: Role) {
    return this.http.post<ServerResult<number>>(`${this.roleUrl}/updateRole`, role);
  }

  getRoleMenuList(roleId: number) {
    return this.http.postForm<ServerResult<Menu[]>>(`${this.roleUrl}/getRoleMenuList`, { roleId: roleId });
  }

  getRoleAuthorityList(roleId: number) {
    return this.http.postForm<ServerResult<Authority[]>>(`${this.roleUrl}/getRoleAuthorityList`, { roleId: roleId });
  }

  setRoleMenu(roleId: number, menuIdList: number[]) {
    return this.http.postForm<ServerResult<number>>(`${this.roleUrl}/setRoleMenu`, { roleId: roleId, menuIdList: menuIdList });
  }

  setRoleAuthority(roleId: number, authorityIdList: number[]) {
    return this.http.postForm<ServerResult<number>>(`${this.roleUrl}/setRoleAuthority`, { roleId: roleId, authorityIdList: authorityIdList });
  }
}
