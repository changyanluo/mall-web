import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { AuthorityListComponent } from './authority/authority-list/authority-list.component';
import { CustomerhomeComponent } from '../customer/customerhome/customerhome.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CustomerhomeComponent },
  { path: 'user', component: UserListComponent },
  { path: 'role', component: RoleListComponent },
  { path: 'menu', component: MenuListComponent },
  { path: 'authority', component: AuthorityListComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
