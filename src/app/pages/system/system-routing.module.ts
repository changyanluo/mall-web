import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';

const routes: Routes = [
  { path: 'user', component: UserListComponent },
  { path: 'role', component: RoleListComponent },
  { path: 'menu', component: MenuListComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
